import Responsive from '@/utils/styles/Responsive';
import { flexColCenter } from '@/utils/styles/Theme';
import React, { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import AuthAdress from './AuthAdress';

interface AuthFormProps {
  auth: string;
}

interface FormProps {
  email: string;
  password: string;
  passwordConfirm: string;
  adress: string;
  adressDetail: string;
}

const AuthForm: FunctionComponent<AuthFormProps> = ({ auth }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormProps>();
  const [adress, setAdress] = useState('');
  const [visible, setVisible] = useState(false);
  return (
    <AuthFormContainer>
      <AuthFormResponsive>
        <AuthFormTitle>
          <h1>Everything</h1>
        </AuthFormTitle>
        <div className="auth-info">
          <span>{auth}</span>
          {auth === 'Login' ? (
            <p>Welcome Back to Everything, Enjoy your shoping</p>
          ) : (
            <p>Hello there, Sign in and Start your shoping into Everything</p>
          )}
        </div>
        <div className="auth-contents">
          <label>
            <span>Email</span>
            <input
              type="text"
              {...register('email', {
                required: true,
                pattern:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              })}
              placeholder="이메일"
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              {...register('password', { required: true })}
              placeholder="비밀번호"
            />
            {auth !== 'Login' && (
              <input
                type="password"
                {...register('passwordConfirm', { required: true })}
                placeholder="비밀번호 확인"
              />
            )}
          </label>
          <label>
            <span>Adress</span>
            <input
              {...register('adress', { required: true })}
              onClick={() => setVisible(true)}
              value={adress}
              readOnly
              className="auth-adress"
              type="text"
              placeholder="주소"
            />
            {visible && (
              <AuthAdress setVisible={setVisible} setAdress={setAdress} />
            )}
          </label>
          <label>
            <span>Adress Detail</span>
            <input {...register('adressDetail', { required: true })} />
          </label>
        </div>
      </AuthFormResponsive>
    </AuthFormContainer>
  );
};

export default AuthForm;

const AuthFormContainer = styled.form`
  z-index: 999;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;
const AuthFormResponsive = styled(Responsive)`
  padding: 4rem 0;
  ${flexColCenter}
  .auth-info {
    margin-top: 5rem;
    ${flexColCenter}
    span {
      font-size: 3rem;
      font-weight: bold;
      color: #9ba5ba;
    }
    p {
      margin-top: 1.5rem;
      font-size: 1.5rem;
      color: ${(props) => props.theme.fontSubColor};
    }
  }
  .auth-contents {
    margin-top: 2rem;
    label {
      display: flex;
      flex-direction: column;
      padding-top: 1rem;
      span {
        font-size: 2rem;
        color: #9ba5ba;
      }
      input {
        outline: none;
        border: none;
        background: none;
        border-bottom: 1.5px solid #9ba5ba;
        width: 40rem;
        padding: 1rem 0;
        font-size: 2rem;
        color: #9ba5ba;
        &::placeholder {
          color: ${(props) => props.theme.fontSubColor};
        }
      }
      .auth-adress {
        cursor: pointer;
      }
    }
  }
`;
const AuthFormTitle = styled.div`
  padding: 3rem;
  background: rgba(245, 179, 213, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  h1 {
    color: ${(props) => props.theme.mainColor};
    font-size: 5rem;
    cursor: pointer;
  }
`;
