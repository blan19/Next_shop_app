import { firebaseAuth } from '@/utils/firebase/clientApp';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function verifyByEmail(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email } = req.body;
  try {
    await firebaseAuth.sendPasswordResetEmail(email);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: 'reset failed' });
  }
  return;
}
