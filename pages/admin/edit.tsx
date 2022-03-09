import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/utils/iron/session';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Edit = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  useEffect(() => {
    if (!user.isLoggedIn) {
      router.push('/');
    }
    if (!user.admin) {
      router.push('/');
    }
  }, [router, user.admin, user.isLoggedIn]);
  return (
    <div>
      <h1>상품 수정 페이지입니다</h1>
    </div>
  );
};

export default Edit;

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;
  if (user === undefined) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: { isLoggedIn: false, email: '', uid: '', admin: false },
      },
    };
  }
  if (user.email === process.env.NEXT_PRIVATE_ADMIN_EMAIL) {
    return {
      props: { user: { ...req.session.user, admin: true } },
    };
  } else {
    return {
      props: { user: { ...req.session.user, admin: false } },
    };
  }
},
sessionOptions);
