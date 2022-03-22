import { firebaseDb } from '@/utils/firebase/clientApp';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getCart(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id: userUid } = req.query;
  try {
    if (typeof userUid === 'string') {
      const snapshot = await firebaseDb.collection('cart').doc(userUid).get();
      if (!snapshot.data()) {
        res.status(400).json({ success: false });
      } else {
        res.status(200).json({ success: true, data: snapshot.data() });
      }
    }
  } catch (error) {
    res.status(400).json(JSON.stringify(error));
  }
}
