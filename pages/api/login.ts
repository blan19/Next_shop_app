import { firebaseAuth, firebaseDb } from '@/utils/firebase/clientApp';
import { sessionOptions } from '@/utils/iron/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from './user';

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = await req.body;

  try {
    const credentials = await firebaseAuth.signInWithEmailAndPassword(
      email,
      password,
    );
    switch (credentials.user?.emailVerified) {
      case true:
        const firebaseUser = await (
          await firebaseDb.collection('users').doc(credentials.user?.uid).get()
        ).data();
        if (credentials.user?.email === process.env.NEXT_PRIVATE_ADMIN_EMAIL) {
          const user = {
            isLoggedIn: true,
            admin: true,
            email,
            name: firebaseUser?.name,
            fullAddress: firebaseUser?.fullAddress,
            uid: credentials.user?.uid,
          } as User;
          req.session.user = user;
          await req.session.save();
          res.json(user);
        } else {
          const user = {
            isLoggedIn: true,
            admin: false,
            email,
            name: firebaseUser?.name,
            fullAddress: firebaseUser?.fullAddress,
            uid: credentials.user?.uid,
          } as User;
          req.session.user = user;
          await req.session.save();
          res.json(user);
        }
        break;
      case false:
        res.status(200).json({ success: false, message: 'need verify' });
        break;
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
