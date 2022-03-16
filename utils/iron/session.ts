import type { IronSessionOptions } from 'iron-session';
import type { User } from 'pages/api/user';

export const sessionOptions: IronSessionOptions = {
  password: process.env.NEXT_PRIVATE_SECRET_COOKIE_PASSWORD as string,
  cookieName: 'next-shop-app',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production' ? true : false,
    maxAge: 60 * 60 * 24 * 1,
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: User;
  }
}
