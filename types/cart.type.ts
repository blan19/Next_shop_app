export interface ICart {
  title: string;
  thumbUrl: string;
  price: string;
  count: string;
  cartUid: string;
  productUid: string;
  option: string[] | null;
}

export interface IPay {
  amount: number;
  cart: ICart[];
  uid: string;
  user: string;
  createAt: Date;
  updateAt: Date;
}

export enum Process {
  READY = 'ready',
  PAID = 'paid',
  REFUND = 'refund',
  DONE = 'done',
}
