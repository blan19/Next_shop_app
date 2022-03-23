import { ICart } from '@/types/cart.type';
import { firebaseDb } from '@/utils/firebase/clientApp';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function remove(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { cartUid, userUid } = req.body;
  try {
    const cart = await (
      await firebaseDb.collection('cart').doc(userUid).get()
    ).data();
    if (cart) {
      const filtered = cart.cart.filter(
        (list: ICart) => list.cartUid !== cartUid,
      );
      await firebaseDb.collection('cart').doc(userUid).update({
        cart: filtered,
      });
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: JSON.stringify(error) });
  }
  return;
}
