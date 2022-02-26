import { flexCenter } from '@/utils/styles/Theme';
import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import DaumPostcode from 'react-daum-postcode';
import styled, { css } from 'styled-components';

interface AuthAdressProps {
  setAdress: Dispatch<SetStateAction<string>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

type DaumPostcodeType = {
  address: string;
};

const AuthAdress: FunctionComponent<AuthAdressProps> = ({
  setAdress,
  setVisible,
}) => {
  const onSubmitAdress = (data: DaumPostcodeType) => {
    setAdress(data.address);
    setVisible((prev) => !prev);
  };
  const StopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('check');
    setVisible(false);
  };
  return (
    <AuthAdressContainer onClick={StopPropagation}>
      <DaumPostcode
        style={{
          width: '75rem',
          height: '50rem',
        }}
        onComplete={onSubmitAdress}
        autoClose
      />
    </AuthAdressContainer>
  );
};

export default AuthAdress;

const AuthAdressContainer = styled.div`
  position: absolute;
  ${flexCenter}
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.45);
`;
