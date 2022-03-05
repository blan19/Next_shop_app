export interface IAuthForm {
  email: string;
  password: string;
  passwordConfirm: string;
  address: string;
  adressDetail: string;
}

export interface IUser {
  email: string;
  address: string;
  admin?: boolean;
}
