import { ICart } from '@/types/cart.type';
import { firebaseDb, firebaseNow } from '@/utils/firebase/clientApp';
import { NextApiRequest, NextApiResponse } from 'next';
import { uid } from 'uid';

interface BodyType {
  products: ICart[];
  userUid: string;
}

export default async function createCart(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { products, userUid } = req.body as BodyType;
  try {
    const exist = await (
      await firebaseDb.collection('cart').doc(userUid).get()
    ).data();
    if (exist) {
      const updateCart = exist.cart.concat(products);
      await firebaseDb
        .collection('cart')
        .doc(userUid)
        .update({
          cart: updateCart,
          updateAt: firebaseNow,
        })
        .then(() => console.log('update cart'));
      res.status(200).json({ success: true });
    } else {
      await firebaseDb
        .collection('cart')
        .doc(userUid)
        .set({
          cart: products,
          user: userUid,
          createAt: firebaseNow,
          updateAt: firebaseNow,
        })
        .then(() => console.log('create cart'));
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json(error);
  }
}
