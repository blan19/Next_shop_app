import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  res.json({ message: 'Hello Everyone!' });
}

export default handler;
