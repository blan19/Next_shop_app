import { firebaseDb } from '@/utils/firebase/clientApp';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function read(req: NextApiRequest, res: NextApiResponse) {
  try {
    const snapshotByCount = await firebaseDb
      .collection('products')
      .orderBy('count', 'desc')
      .limit(5)
      .get();
    const popular = snapshotByCount.docs.map((doc) => doc.data());
    const snapshotByDate = await firebaseDb
      .collection('products')
      .orderBy('createAt', 'desc')
      .limit(5)
      .get();
    const recent = snapshotByDate.docs.map((doc) => doc.data());
    res.status(200).json({ success: true, data: { popular, recent } });
  } catch (e) {
    res.status(400).json({ success: false, message: 'fail read' });
  }
  return;
}
