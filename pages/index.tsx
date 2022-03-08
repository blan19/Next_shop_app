import styled from 'styled-components';
import { NextPage } from 'next';
import React from 'react';
import Layouts from '../Layouts';
import Responsive from '@/utils/styles/Responsive';
import TimeBoard from '@/components/Main/TimeBoard';

const Index: NextPage = () => {
  return (
    <Layouts>
      <IndexResponsive>
        <TimeBoard />
        <h1>Main Page..!</h1>
      </IndexResponsive>
    </Layouts>
  );
};

export default Index;

const IndexResponsive = styled(Responsive)`
  margin-top: 3rem;
`;
