import Responsive from '@/utils/styles/Responsive';
import { flexColCenter } from '@/utils/styles/Theme';
import React, { FunctionComponent, useRef, useState } from 'react';
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
  address: string;
  addressDetail: string;
}

const AuthForm: FunctionComponent<AuthFormProps> = ({ auth }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormProps>();
  const [address, setAddress] = useState('');
  const [visible, setVisible] = useState(false);
  const password = useRef<string>();
  password.current = watch('password');

  const onSubmit = (data: FormProps) => {
    console.log(data);
    reset({
      email: '',
      password: '',
      passwordConfirm: '',
      address: '',
      addressDetail: '',
    });
  };
  return (
    <AuthFormContainer onSubmit={handleSubmit(onSubmit)}>
      <AuthFormResponsive>
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
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: '유효하지 않은 이메일입니다',
                },
              })}
              placeholder="이메일"
            />
          </label>
          {errors.email && errors.email.type === 'required' && (
            <AuthErrorMessage>
              <p>❌ 이메일을 입력해주세요.</p>
            </AuthErrorMessage>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <AuthErrorMessage>
              <p>❌ 이메일을 정확히 입력해주세요.</p>
            </AuthErrorMessage>
          )}
          <label>
            <span>Password</span>
            <input
              type="password"
              {...register('password', { required: true, minLength: 5 })}
              placeholder="비밀번호"
            />
            {auth !== 'Login' && (
              <input
                type="password"
                {...register('passwordConfirm', {
                  required: true,
                  validate: (value) => value === password.current,
                })}
                placeholder="비밀번호 확인"
              />
            )}
          </label>
          {errors.password && errors.password.type === 'required' && (
            <AuthErrorMessage>
              <p>❌ 비밀번호를 입력해주세요.</p>
            </AuthErrorMessage>
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <AuthErrorMessage>
              <p>❌ 5글자 이상 입력해주세요.</p>
            </AuthErrorMessage>
          )}
          {errors.passwordConfirm &&
            errors.passwordConfirm !== errors.password && (
              <AuthErrorMessage>
                <p>❌ 비밀번호를 확인해주세요.</p>
              </AuthErrorMessage>
            )}
          {auth !== 'Login' && (
            <>
              <label>
                <span>Address</span>
                <input
                  {...register('address', { required: true })}
                  onClick={() => setVisible(true)}
                  value={address}
                  readOnly
                  className="auth-adress"
                  type="text"
                  placeholder="주소"
                />
                {visible && (
                  <AuthAdress setVisible={setVisible} setAdress={setAddress} />
                )}
              </label>
              <label>
                <span>Address Detail</span>
                <input
                  type="text"
                  {...register('addressDetail', { required: true })}
                  placeholder="상세주소"
                />
              </label>
            </>
          )}
          {errors.address && errors.address.type === 'required' && (
            <AuthErrorMessage>
              <p>❌ 주소를 입력해주세요.</p>
            </AuthErrorMessage>
          )}
          {errors.addressDetail && errors.addressDetail.type === 'required' && (
            <AuthErrorMessage>
              <p>❌ 상세주소를 입력해주세요.</p>
            </AuthErrorMessage>
          )}
          <label>
            {auth !== 'Login' ? (
              <button>본인인증하고 회원가입</button>
            ) : (
              <button>로그인</button>
            )}
          </label>
        </div>
      </AuthFormResponsive>
    </AuthFormContainer>
  );
};

export default AuthForm;

const AuthFormContainer = styled.form``;
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
      color: var(--color-subText);
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
          color: var(--color-subText);
        }
        -webkit-text-fill-color: #9ba5ba;
      }
      .auth-adress {
        cursor: pointer;
      }
      button {
        outline: none;
        border: none;
        background: none;
        font-size: 2rem;
        background: var(--color-rPrimaryText);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        border-radius: 1rem;
        padding: 1.4rem;
        margin-top: 2rem;
        color: #9ba5ba;
        cursor: pointer;
      }
    }
  }
`;

const AuthErrorMessage = styled.div`
  padding: 1rem 0;
  p {
    font-size: 1.5rem;
    color: red;
    font-weight: bold;
  }
`;
