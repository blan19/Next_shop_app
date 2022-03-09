import { useRouter } from 'next/router';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/utils/iron/session';
import { InferGetServerSidePropsType } from 'next';
import { useEffect } from 'react';
import styled from 'styled-components';
import Responsive from '@/utils/styles/Responsive';
import Layouts from '../../Layouts';
import RegisterForm from '@/components/admin/RegisterForm';

const Register = ({
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
    <Layouts>
      <RegisterResponsive>
        <RegisterForm />
      </RegisterResponsive>
    </Layouts>
  );
};

export default Register;

const RegisterResponsive = styled(Responsive)`
  margin-top: 3rem;
`;

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
