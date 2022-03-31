import CartRedirect from '@/components/Payment/Cart/CartRedirect';
import useUser from '@/hooks/useUser';
import { IPayment } from '@/types/pay.type';
import Responsive from '@/utils/styles/Responsive';
import { flexColCenter } from '@/utils/styles/Theme';
import Layouts from 'Layouts';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import styled from 'styled-components';

interface CompleteQuery extends ParsedUrlQuery {
  imp_uid: string;
  merchant_uid: string;
  success: string;
  userUid: string;
}

const Complete = ({
  error,
  userUid,
  receipt,
  success,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser();
  const router = useRouter();

  if (error || !user || user.uid !== userUid) {
    return (
      <Layouts
        title="Redirect"
        description={`상품 결제 조회를 위한 페이지`}
        image={null}
        url={
          process.env.NEXT_PULBIC_URL
            ? process.env.NEXT_PULBIC_URL
            : 'http://localhost:3000'
        }
      >
        <CompleteResponsive>
          <div className="complete-not-access">
            <h1>잘못된 주소 접근입니다.</h1>
            <button onClick={() => router.push('/')}>Home</button>
          </div>
        </CompleteResponsive>
      </Layouts>
    );
  }

  return (
    <Layouts
      title="Redirect"
      description={`상품 결제 조회를 위한 페이지`}
      image={null}
      url={
        process.env.NEXT_PULBIC_URL
          ? process.env.NEXT_PULBIC_URL
          : 'http://localhost:3000'
      }
    >
      <CompleteResponsive>
        <CartRedirect receipt={receipt} success={success} />
      </CompleteResponsive>
    </Layouts>
  );
};

export default Complete;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const { merchant_uid, imp_uid, userUid, success } = query as CompleteQuery;
  if (!merchant_uid || !imp_uid || !userUid) {
    return {
      props: {
        error: true,
      },
    };
  }
  const snapshot = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/payment/read`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ merchant_uid }),
    },
  ).then((res) => res.json());
  const receipt: IPayment = snapshot.data;
  return {
    props: {
      error: false,
      userUid,
      receipt,
      success,
    },
  };
};

const CompleteResponsive = styled(Responsive)`
  .complete-not-access {
    ${flexColCenter}
    margin-top: 15rem;
    h1 {
      font-size: 3.5rem;
      font-weight: 400;
      color: var(--color-primaryText);
    }
    button {
      margin-top: 3rem;
      outline: none;
      background: var(--color-lightColor);
      border: 1px solid var(--color-subColor);
      color: #000;
      font-size: 2.5rem;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      cursor: pointer;
      &:hover {
        outline: 1px solid var(--color-mainColor);
      }
    }
  }
`;
