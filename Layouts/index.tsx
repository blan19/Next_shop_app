import { NextPage } from 'next';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layouts: NextPage = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layouts;
