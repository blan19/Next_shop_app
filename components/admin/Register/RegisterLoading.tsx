import styled from 'styled-components';
import Loading, { LoadingType } from 'react-loading';
import { FunctionComponent } from 'react';

interface RegisterLoadingProps {
  type: LoadingType | undefined;
  color?: string;
  width?: string;
  height?: string;
}

const RegisterLoading: FunctionComponent<RegisterLoadingProps> = ({
  type,
  color,
  width = '64px',
  height = '64px',
}) => {
  return (
    <RegisterLoadingContainer>
      <Loading type={type} color={color} width={width} height={height} />
    </RegisterLoadingContainer>
  );
};

export default RegisterLoading;

const RegisterLoadingContainer = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  z-index: 999;
`;
