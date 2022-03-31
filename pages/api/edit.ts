import { firebaseAuth, firebaseDb } from '@/utils/firebase/clientApp';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function edit(req: NextApiRequest, res: NextApiResponse) {
  const { name, address } = req.body;
  try {
    const user = await firebaseAuth.currentUser;
    if (user) {
      await firebaseDb.collection('users').doc(user.uid).update({
        name,
        address,
      });
      res.status(200).json({ success: true, message: 'edit user' });
    } else {
      res.status(400).json({ success: true, message: 'failed edit user' });
    }
  } catch (error) {
    res.status(400).json(JSON.stringify(error));
  }
}
