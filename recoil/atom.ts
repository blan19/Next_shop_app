import { atom } from 'recoil';

interface authFormStateType {
  email: string;
}
export const autoFormState = atom({
  key: 'authFormState',
  default: <authFormStateType>{},
});
