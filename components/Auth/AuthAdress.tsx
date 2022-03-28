import { flexCenter } from '@/utils/styles/Theme';
import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { UseFormSetValue } from 'react-hook-form';
import styled from 'styled-components';
import { FormProps } from './AuthForm';

interface AuthAdressProps {
  setAdress: Dispatch<SetStateAction<string>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<FormProps>;
}

type DaumPostcodeType = {
  address: string;
};

const AuthAdress: FunctionComponent<AuthAdressProps> = ({
  setAdress,
  setVisible,
  setValue,
}) => {
  const onSubmitAdress = (data: DaumPostcodeType) => {
    setValue('address', data.address);
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
