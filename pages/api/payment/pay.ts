import { IPay, Process } from '@/types/cart.type';
import { firebaseDb, firebaseNow } from '@/utils/firebase/clientApp';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function pay(req: NextApiRequest, res: NextApiResponse) {
  const { merchant_uid, imp_uid, userUid, payList } = req.body;
  try {
    // 토큰 발급
    const getToken = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: {
        imp_key: process.env.NEXT_PUBLIC_IAMPORT_API_KEY,
        imp_secret: process.env.NEXT_PUBLIC_IAMPORT_SECRET_KEY,
      },
    });

    const { access_token } = getToken.data.response;

    // 아임포트  서버 결제 정보 조회
    const getPaymentData = await axios({
      url: `https://api.iamport.kr/payments/${imp_uid}`,
      method: 'GET',
      headers: { Authorization: access_token },
    });

    const paymentData = getPaymentData.data.response;

    // db amount 비교
    const order = await (
      await firebaseDb.collection('cart').doc(userUid).get()
    ).data();
    const { amount: amountToBePaid } = order as IPay;
    const { amount, status } = paymentData;
    if (amount === amountToBePaid) {
      switch (status) {
        case 'paid':
          await firebaseDb.collection('payments').doc(merchant_uid).set({
            merchant_uid,
            imp_uid,
            userUid,
            paymentData,
            process: Process.PAID,
            delivery: null,
            createAt: firebaseNow,
            updateAt: firebaseNow,
          });
          await payList.map(
            async (string: string) =>
              await firebaseDb
                .collection('products')
                .doc(string)
                .update({ count: +1 }),
          );
          await firebaseDb.collection('cart').doc(userUid).update({ cart: [] });
          res.status(200).json({
            success: true,
            message: '일반 결제 성공',
            data: { merchant_uid, imp_uid, userUid },
          });
          break;
      }
    } else {
      throw { status: 'forgery', message: '위조된 결제시도' };
    }
  } catch (error) {
    res.status(400).json({ success: false, message: JSON.stringify(error) });
  }
}
