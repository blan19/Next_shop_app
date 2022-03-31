import useUser from '@/hooks/useUser';
import Responsive from '@/utils/styles/Responsive';
import { flexColCenter } from '@/utils/styles/Theme';
import axios from 'axios';
import Layouts from 'Layouts';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import useDarkMode from 'use-dark-mode';
import 'react-toastify/dist/ReactToastify.css';

const Verify = () => {
  const darkmode = useDarkMode(false);
  const router = useRouter();
  const { user } = useUser();

  const onVerify = useCallback(async () => {
    if (router.query.email) {
      await axios({
        url: '/api/verify',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ email: router.query.email }),
      }).then(() =>
        toast('링크를 다시 보냈습니다', {
          position: 'top-center',
          autoClose: 2000,
          progress: undefined,
          hideProgressBar: true,
          closeOnClick: false,
        }),
      );
    } else {
    }
  }, [router.query.email]);

  useEffect(() => {
    if (user) {
      if (user.isLoggedIn) {
        router.push('/');
      }
    }
  }, [router, user]);
  return (
    <Layouts
      title="Verify"
      description="회원 이메일 인증을 위한 페이지"
      url={
        process.env.NEXT_PULBIC_URL
          ? process.env.NEXT_PULBIC_URL
          : 'http://localhost:3000'
      }
      image={null}
    >
      <VerifyResponsive>
        <div className="verify-wrapper">
          <div className="verify-info">
            <h1>등록한 이메일로 인증링크를 보냈습니다</h1>
            <p>서비스를 이용하기 위해선 추가적인 이메일 인증이 필요합니다</p>
            <p>인증을 완료해주세요</p>
            <span>
              인증을 완료하셨습니까?{' '}
              <b onClick={() => router.push('/auth/login')}>로그인</b>
            </span>
          </div>
          <div className="verify-reverify-button">
            <span>
              링크가 유효하지 않습니까?{' '}
              <b onClick={onVerify}>링크 다시 보내기</b>
            </span>
          </div>
        </div>
      </VerifyResponsive>
      <ToastContainer theme={darkmode.value ? 'dark' : 'light'} />
    </Layouts>
  );
};

export default Verify;

const VerifyResponsive = styled(Responsive)`
  .verify-wrapper {
    margin-top: 15rem;
    .verify-info {
      ${flexColCenter}
      h1 {
        font-size: 3.5rem;
        font-weight: 400;
        color: var(--color-primaryText);
      }
      p {
        font-size: 2rem;
        font-weight: 300;
        color: var(--color-subText);
        margin-top: 2rem;
      }
      span {
        color: var(--color-primaryText);
        font-weight: 300;
        margin-top: 5rem;
        font-size: 2rem;
        b {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
    .verify-reverify-button {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 10rem;
      span {
        font-size: 1.5rem;
        font-weight: 300;
        color: var(--color-subText);
        b {
          cursor: pointer;
          text-decoration: underline;
          color: var(--color-mainColor);
          font-weight: bold;
        }
      }
    }
  }
`;
