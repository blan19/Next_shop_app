import styled from 'styled-components';
import { NextPage } from 'next';
import React from 'react';
import Layouts from '../Layouts';
import Responsive from '@/utils/styles/Responsive';
import TimeBoard from '@/components/Main/TimeBoard';
import Main from '@/components/Main';

const Index: NextPage = () => {
  return (
    <Layouts>
      <IndexResponsive>
        <TimeBoard />
        <Main />
      </IndexResponsive>
    </Layouts>
  );
};

export default Index;

const IndexResponsive = styled(Responsive)`
  margin-top: 3rem;
`;
