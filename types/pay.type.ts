import { Timestamp } from 'firebase/firestore';

export interface IFirebaseNow {
  seconds: number;
  nanoseconds: number;
}

export interface IPaymentData {
  amount: number;
  buyer_name: string;
  buyer_email: string;
  buyer_tel: string;
  buyer_addr: string;
  name: string;
}

export interface IPayment {
  merchant_uid: string;
  userUid: string;
  paymentData: IPaymentData;
  process: string;
  delivery: string | null;
  createAt: Timestamp;
  updateAt: Timestamp;
}
