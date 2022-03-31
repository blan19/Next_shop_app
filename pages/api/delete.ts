import { firebaseAuth, firebaseDb } from '@/utils/firebase/clientApp';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function deleteUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const user = await firebaseAuth.currentUser;
    if (user) {
      await user
        .delete()
        .then(() => firebaseDb.collection('users').doc(user.uid).delete());
      res.status(200).json({ success: true, message: 'delete user' });
    } else {
      res.status(400).json({ success: false, message: 'failed delete user' });
    }
  } catch (error) {
    res.status(400).json(JSON.stringify(error));
  }
}
