import { firebaseDb } from '@/utils/firebase/clientApp';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function removeAll(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { usesrUid } = req.body;
  try {
    await firebaseDb
      .collection('cart')
      .doc(usesrUid)
      .update({
        cart: [],
      })
      .then(() => console.log('카트 목록 전체삭제'));
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json(JSON.stringify(error));
  }
}
