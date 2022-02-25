import styled from 'styled-components';
import { NextPage } from 'next';
import React from 'react';
import Layouts from '../Layouts';

const Index: NextPage = () => {
  return (
    <Layouts>
      <IndexContainer>
        <h1>Main Page..!</h1>
      </IndexContainer>
    </Layouts>
  );
};

export default Index;

const IndexContainer = styled.div``;
