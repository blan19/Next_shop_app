import { firebaseAuth } from '@/utils/firebase/clientApp';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function verifyByEmail(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await firebaseAuth.currentUser?.sendEmailVerification();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: 'verify failed' });
  }
  return;
}
