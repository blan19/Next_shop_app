import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

const Layouts: FunctionComponent = ({ children }) => {
  return (
    <>
      <Header />
      <Space />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layouts;

const Space = styled.div`
  width: 100%;
  height: 76.5px;
`;
