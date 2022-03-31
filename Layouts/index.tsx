import Head from 'next/head';
import React, { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

type TemplateProps = {
  title: string;
  description: string;
  url: string;
  image: string | null;
  children: ReactNode;
};

const Layouts: FunctionComponent<TemplateProps> = ({
  title,
  description,
  image,
  url,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={description} />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {image && <meta property="og:image" content={image} />}
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={title} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {image && <meta name="twitter:image" content={image} />}
        <meta name="twitter:site" content="next-shop-app" />
        <meta name="twitter:creator" content="blan19" />
      </Head>
      <Header />
      <Space />
      <Main>{children}</Main>
      {/* <Footer /> */}
    </>
  );
};

export default Layouts;

const Space = styled.div`
  width: 100%;
  height: 76.5px;
`;

const Main = styled.main`
  margin-bottom: 5rem;
`;
