import useUser from '@/hooks/useUser';
import { ICart } from '@/types/cart.type';
import { ErrorMessage } from '@hookform/error-message';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { uid } from 'uid';
import { RequestPayResponse } from 'iamport-typings';
import fetchJson from '@/utils/lib/fetchJson';
import { KeyedMutator } from 'swr';
import { useRouter } from 'next/router';

interface PaymentFormTypes {
  name: string;
  email: string;
  call: string;
  agreement: boolean;
}

interface CartPaymentProps {
  cart: ICart[];
  cartUid: string;
  mutate: KeyedMutator<any>;
  userUid: string;
}

const CartPayment: FunctionComponent<CartPaymentProps> = ({
  cart,
  userUid,
  mutate,
}) => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<PaymentFormTypes>();
  const { user } = useUser();
  const router = useRouter();
  const [error, setError] = useState('');
  const onClickPayment = useCallback(
    async (data: PaymentFormTypes) => {
      const { name, call, email } = data;
      if (user) {
        const params = {
          pg: 'uplus',
          pay_method: 'card',
          merchant_uid: uid(10),
          name: cart
            .map((item) => item.title + ' ' + item.option?.join(' '))
            .join(' / '),
          amount: cart.reduce(
            (acc, cur) => acc + Number(cur.count) * Number(cur.price),
            0,
          ),
          buyer_email: email,
          buyer_name: name,
          buyer_tel: call,
          buyer_addr: user?.fullAddress,
          m_redirect_url: `${process.env.NEXT_PUBLIC_URL}/payment/complete`,
        };
        const { IMP } = window;
        if (IMP) {
          IMP.init(
            process.env.NEXT_PUBLIC_MERCHANT_ID
              ? process.env.NEXT_PUBLIC_MERCHANT_ID
              : '',
          );
          IMP.request_pay(params, async (res: RequestPayResponse) => {
            const { merchant_uid, imp_uid } = res;
            if (res.success) {
              await fetchJson('/api/payment/pay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  merchant_uid,
                  imp_uid,
                  userUid,
                }),
              }).then((res: any) => {
                mutate();
                console.log(res);

                router.push(
                  `/payment/complete?merchant_uid=${res.data.merchant_uid}&imp_uid=${res.data.imp_uid}&userUid=${res.data.userUid}&success=true`,
                );
              });
            } else {
              setError('결제에 실패했습니다');
              reset();
            }
          });
        }
      } else {
        setError('로그인이 필요한 서비스입니다');
        reset();
      }
    },
    [cart, mutate, reset, router, user, userUid],
  );
  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);
  return (
    <CartPaymentForm onSubmit={handleSubmit(onClickPayment)}>
      <label className="payment-form-price">
        <h1>총계</h1>
        <h1>
          ₩
          {cart
            .reduce(
              (acc, cur) => acc + Number(cur.count) * Number(cur.price),
              0,
            )
            .toLocaleString('ko-Kr', { maximumFractionDigits: 4 })}
        </h1>
      </label>
      <p>주문자 이름</p>
      <label className="payment-form-label">
        <input
          className="payment-form-input-initial"
          type="text"
          {...register('name', { required: '이름을 입력해주세요' })}
        />
      </label>
      <ErrorMessage
        errors={errors}
        name="name"
        render={({ message }) => (
          <PaymentErrorMessage>{message}</PaymentErrorMessage>
        )}
      />
      <p>주문자 번호</p>
      <label className="payment-form-label">
        <input
          className="payment-form-input"
          type="text"
          placeholder="-없이 숫자만 입력"
          {...register('call', {
            required: '핸드폰 번호를 입력해주세요',
            pattern: {
              value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
              message: '핸드폰 번호를 정확히 입력해주세요',
            },
          })}
        />
      </label>
      <ErrorMessage
        errors={errors}
        name="call"
        render={({ message }) => (
          <PaymentErrorMessage>{message}</PaymentErrorMessage>
        )}
      />
      <p>주문자 이메일</p>
      <label className="payment-form-label">
        <input
          className="payment-form-input-initial"
          type="text"
          value={user?.email}
          readOnly
          {...register('email', { required: '이메일을 입력해주세요' })}
        />
      </label>
      <ErrorMessage
        errors={errors}
        name="email"
        render={({ message }) => (
          <PaymentErrorMessage>{message}</PaymentErrorMessage>
        )}
      />
      <p>(필수) 구매조건 및 개인정보취급방침 동의</p>
      <label className="payment-form-label">
        <input
          type="checkbox"
          {...register('agreement', { required: '약관에 동의해주세요' })}
        />
      </label>
      <ErrorMessage
        errors={errors}
        name="agreement"
        render={({ message }) => (
          <PaymentErrorMessage>{message}</PaymentErrorMessage>
        )}
      />
      <button type="submit">결제하기</button>
    </CartPaymentForm>
  );
};

export default CartPayment;

const CartPaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 32.5rem;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  .payment-form-price {
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 2.5rem;
      font-weight: 500;
      color: var(--color-primaryText);
    }
  }
  p {
    margin-top: 1rem;
    font-size: 2rem;
    font-weight: 300;
    color: gray;
  }
  .payment-form-label {
    input {
      margin-top: 0.5rem;
    }
    .payment-form-input {
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
    .payment-form-input-initial {
      width: 100%;
      padding: 1rem;
      font-size: 2rem;
      font-weight: 300;
      color: gray;
      border: 1px solid var(--color-subColor);
      border-radius: 0.5rem;
      background: var(--color-lightColor);
      &:focus {
        outline: 1px solid var(--color-mainColor);
      }
    }
  }
  button {
    width: 100%;
    background: var(--color-mainColor);
    color: #fff;
    cursor: pointer;
    font-size: 2.5rem;
    font-weight: 400;
    border: none;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-top: 1rem;
  }
`;

const PaymentErrorMessage = styled.span`
  margin-top: 1rem;
  font-size: 1.75rem;
  color: red;
  font-weight: 400;
`;
