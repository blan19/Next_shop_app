import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

const Responsive: NextPage = ({ children, ...props }) => {
  return <ResponsiveContainer {...props}>{children}</ResponsiveContainer>;
};

export default Responsive;

const ResponsiveContainer = styled.div`
  margin: 0 auto;
  @media screen and (min-width: 1024px) {
    width: 1024px;
  }
  @media screen and (max-width: 1024px) {
    width: 768px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 2.5rem;
  }
`;
