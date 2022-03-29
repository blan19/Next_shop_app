import AuthContainer from '@/components/Auth/AuthContainer';
import Head from 'next/head';
import React from 'react';

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>

        <meta name="description" content="회원 로그인 페이지" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Login" />
        <meta property="og:description" content="회원 로그인 페이지" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_URL}/auth/login`}
        />
        <meta property="og:site_name" content="Login" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Login" />
        <meta name="twitter:description" content="회원 로그인 페이지" />
        <meta name="twitter:site" content="next-shop-app" />
        <meta name="twitter:creator" content="blan19" />
      </Head>
      <AuthContainer auth="Login" />
    </>
  );
};

export default Login;
