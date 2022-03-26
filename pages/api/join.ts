import { firebaseAuth, firebaseDb } from '@/utils/firebase/clientApp';
import { sessionOptions } from '@/utils/iron/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

async function joinRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, address, name } = await req.body;

  try {
    const credentials = await firebaseAuth.createUserWithEmailAndPassword(
      email,
      password,
    );
    credentials.user?.updateProfile({ displayName: name });
    await firebaseDb
      .collection('users')
      .doc(credentials.user?.uid)
      .set({ uid: credentials.user?.uid, email, password, address, name });
    switch (credentials.user?.emailVerified) {
      case false:
        credentials.user.sendEmailVerification();
        res.status(200).json({ message: 'need verify' });
        break;
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(joinRoute, sessionOptions);
