import { firebaseAuth } from '@/utils/firebase/clientApp';
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
    if (credentials) {
      const user = {
        isLoggedIn: true,
        email,
        uid: credentials.user?.uid,
      } as User;
      req.session.user = user;
      await req.session.save();
      res.json(user);
    } else {
      res.status(500).json({ message: 'failed login' });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);