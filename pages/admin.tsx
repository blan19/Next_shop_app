import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Responsive from '@/utils/styles/Responsive';
import Layouts from '../Layouts';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/utils/iron/session';
import { User } from './api/user';
import { InferGetServerSidePropsType } from 'next';

const Admin = ({
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
      <AdminResponsive>
        <h1>admin page</h1>
      </AdminResponsive>
    </Layouts>
  );
};

export default Admin;

const AdminResponsive = styled(Responsive)``;

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
  if (user.email === process.env.ADMIN_EMAIL) {
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
