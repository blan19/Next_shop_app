import { firebaseDb } from '@/utils/firebase/clientApp';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getProduct(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { uid } = req.body;
  if (!uid) {
    res.status(400).json({ success: false });
  }
  try {
    const snapshot = await firebaseDb.collection('products').doc(uid).get();
    res.status(200).json(snapshot.data());
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
}
