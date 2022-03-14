type Time = {
  seconds: number;
  nanoseconds: number;
};

export type IProduct = {
  category: string;
  clear: boolean;
  createAt: Time;
  deliveryCompany: string;
  deliveryCost: string | null;
  deliveryFree: boolean;
  infoPath: string[] | null;
  option: boolean;
  optionInfo: { contents: string }[] | null;
  price: string;
  size: boolean;
  sizeInfo:
    | {
        size: string;
        detail_1: string;
        detail_2: string;
        detail_3: string;
        detail_4: string;
      }[]
    | null;
  thumbPath: string[];
  title: string;
  updateAt: Time;
  uid: string;
};
