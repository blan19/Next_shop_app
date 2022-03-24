import { firebaseDb } from '@/utils/firebase/clientApp';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function read(req: NextApiRequest, res: NextApiResponse) {
  const { merchant_uid } = req.body;
  try {
    const snapshot = await (
      await firebaseDb.collection('payments').doc(merchant_uid).get()
    ).data();
    res.status(400).json({ success: true, data: snapshot });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
