import React, { FunctionComponent } from 'react';
import { flexColCenter } from '@/utils/styles/Theme';
import styled from 'styled-components';
import AuthBackground from './AuthBackground';
import AuthForm from './AuthForm';

interface AuthContainerProps {
  auth: string;
}

const AuthContainer: FunctionComponent<AuthContainerProps> = ({ auth }) => {
  return (
    <AuthContainerBlock>
      <AuthBackground />
      <AuthForm auth={auth} />
    </AuthContainerBlock>
  );
};

export default AuthContainer;

const AuthContainerBlock = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  ${flexColCenter}
`;
