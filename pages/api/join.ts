import { firebaseAuth, firebaseDb } from '@/utils/firebase/clientApp';
import { sessionOptions } from '@/utils/iron/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from './user';

async function joinRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, address } = await req.body;

  try {
    const credentials = await firebaseAuth.createUserWithEmailAndPassword(
      email,
      password,
    );
    await firebaseDb
      .collection('users')
      .doc(credentials.user?.uid)
      .set({ uid: credentials.user?.uid, email, password, address });
    const user = {
      isLoggedIn: true,
      uid: credentials.user?.uid,
      email,
    } as User;
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(joinRoute, sessionOptions);
