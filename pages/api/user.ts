import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/utils/iron/session';
import { NextApiRequest, NextApiResponse } from 'next';

export type User = {
  isLoggedIn: boolean;
  uid: string;
  email: string;
};

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
      uid: '',
      email: '',
    });
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
