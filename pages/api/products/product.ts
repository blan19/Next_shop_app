import { firebaseDb } from '@/utils/firebase/clientApp';
import { NextApiRequest, NextApiResponse } from 'next';

async function getProducts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const snapsoht = await firebaseDb.collection('products').get();
    const products = snapsoht.docs.map((doc) => doc.data());
    res.status(200).json(products);
  } catch (e) {
    res
      .status(400)
      .json({ success: false, message: '게시글 조회에 실패했습니다.' });
  }
}

export default getProducts;
