import { firebaseDb } from '@/utils/firebase/clientApp';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function readByUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id: userUid } = req.query;
  try {
    if (typeof userUid === 'string') {
      const receipt: any[] = [];
      const snapshot = await firebaseDb
        .collection('payments')
        .where('userUid', '==', userUid)
        .get();
      snapshot.forEach((doc) => receipt.push(doc.data()));
      res.status(200).json({ success: true, data: receipt });
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
