import { firebaseDb } from '@/utils/firebase/clientApp';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function editProduct(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { uid, clear } = req.body;
  try {
    if (req.method === 'PUT') {
      await firebaseDb.collection('products').doc(uid).update({
        clear: !clear,
      });
      return res
        .status(200)
        .json({ success: true, message: '상품 수정을 완료했습니다.' });
    } else if (req.method === 'DELETE') {
      await firebaseDb.collection('products').doc(uid).delete();
      return res
        .status(200)
        .json({ success: true, message: '상품 삭제를 완료했습니다.' });
    }
  } catch (e) {
    console.error(e);
  }
  return res.status(400).json({ success: false });
}
