import styled from 'styled-components';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import Layouts from '../Layouts';
import useAuthProvider from '@/hooks/useAuth';

const Index: NextPage = () => {
  const Auth = useAuthProvider();
  useEffect(() => {
    console.log(Auth.user);
  }, [Auth.user]);
  return (
    <Layouts>
      <IndexContainer>
        <h1>Main Page..!</h1>
      </IndexContainer>
    </Layouts>
  );
};

export default Index;

const IndexContainer = styled.div`
  h1 {
    color: var(--color-primaryText);
  }
`;
