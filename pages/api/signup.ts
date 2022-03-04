import initAuth from '@/utils/firebase/initAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import { getFirebaseAdmin } from 'next-firebase-auth';

initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // 사용자 가입 후, 성공 -> 사용자 info 테이블에 주소 저장
  const { createUser } = getFirebaseAdmin().auth();
};

export default handler;
