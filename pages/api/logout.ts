import { sessionOptions } from '@/utils/iron/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import type { User } from 'pages/api/user';

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  req.session.destroy();
  res.json({
    isLoggedIn: false,
    email: '',
    uid: '',
    admin: false,
    fullAddress: '',
    name: '',
  });
}
