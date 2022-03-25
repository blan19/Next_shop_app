import Responsive from '@/utils/styles/Responsive';
import { flexColCenter } from '@/utils/styles/Theme';
import Layouts from 'Layouts';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Verify = () => {
  const router = useRouter();
  return (
    <Layouts>
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
              링크가 유효하지 않습니까? <b>링크 다시 보내기</b>
            </span>
          </div>
        </div>
      </VerifyResponsive>
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
