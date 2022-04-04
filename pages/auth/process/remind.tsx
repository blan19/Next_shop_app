import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import Layouts from 'Layouts';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import useDarkMode from 'use-dark-mode';
import { VerifyResponsive } from './verify';
import 'react-toastify/dist/ReactToastify.css';

interface FormType {
  email: string;
}

const Remind = () => {
  const darkmode = useDarkMode();
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>();
  const onReset = useCallback(async (data: FormType) => {
    const { email } = data;
    await axios({
      url: '/api/remind',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ email }),
    }).then(() =>
      toast('이메일에 재설정 링크를 보냈습니다', {
        position: 'top-center',
        autoClose: 2000,
        progress: undefined,
        hideProgressBar: true,
        closeOnClick: false,
      }),
    );
  }, []);
  return (
    <Layouts
      title="Remind"
      description="회원 비밀번호 재설정을 위한 페이지"
      url={
        process.env.NEXT_PULBIC_URL
          ? process.env.NEXT_PULBIC_URL
          : 'http://localhost:3000'
      }
      image={null}
    >
      <RemindResponsive>
        <div className="verify-wrapper">
          <div className="verify-info">
            <h1>비밀번호 재설정을 위한 이메일을 입력해주세요</h1>
            <p>
              비밀번호 재설정을 하기 위해선 추가적인 이메일 입력이 필요합니다
            </p>
            <form className="remind-input" onSubmit={handleSubmit(onReset)}>
              <label>
                <input
                  type="text"
                  placeholder="Email"
                  {...register('email', {
                    required: '메일을 입력해주세요',
                    pattern: {
                      value:
                        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                      message: '유효하지 않은 이메일입니다',
                    },
                  })}
                />
                <button>재설정</button>
              </label>
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <RemindErrorMessage>
                    <b>{message}</b>
                  </RemindErrorMessage>
                )}
              />
            </form>
            <span>
              비밀번호를 리셋하셨습니까?{' '}
              <b onClick={() => router.push('/auth/login')}>로그인</b>
            </span>
          </div>
        </div>
      </RemindResponsive>
      <ToastContainer theme={darkmode.value ? 'dark' : 'light'} />
    </Layouts>
  );
};

export default Remind;

const RemindResponsive = styled(VerifyResponsive)`
  .remind-input {
    margin-top: 3rem;
    width: 45rem;
    label {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      input {
        width: 100%;
        padding: 1rem;
        font-size: 2rem;
        font-weight: 300;
        color: gray;
        border: 1px solid var(--color-subColor);
        border-radius: 0.5rem;
        background: var(--color-bgColor);
        &:focus {
          outline: 1px solid var(--color-mainColor);
        }
      }
      button {
        margin-left: 1.5rem;
        outline: none;
        width: 15rem;
        cursor: pointer;
        font-size: 2rem;
        font-weight: 300;
        padding: 1rem;
        border: 1px solid var(--color-mainColor);
        background: var(--color-bgColor);
        border-radius: 0.5rem;

        &:focus {
          outline: 1px solid var(--color-mainColor);
        }
      }
    }
  }
`;

const RemindErrorMessage = styled.div`
  margin-top: 1.5rem;
  b {
    color: red;
    font-size: 1.75rem;
    font-weight: 400;
  }
`;
