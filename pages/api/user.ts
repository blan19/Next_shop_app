import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/utils/iron/session';
import { NextApiRequest, NextApiResponse } from 'next';

export type User = {
  isLoggedIn: boolean;
  admin: boolean;
  uid: string;
  email: string;
  fullAddress: string;
};

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    if (req.session.user.email === process.env.NEXT_PRIVATE_ADMIN_EMAIL) {
      res.json({
        ...req.session.user,
        admin: true,
        isLoggedIn: true,
      });
    } else {
      res.json({
        ...req.session.user,
        admin: false,
        isLoggedIn: true,
      });
    }
  } else {
    res.json({
      isLoggedIn: false,
      admin: false,
      uid: '',
      email: '',
      fullAddress: '',
    });
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
