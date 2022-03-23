import useUser from '@/hooks/useUser';
import { ICart } from '@/types/cart.type';
import { FunctionComponent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

interface CartPaymentProps {
  cart: ICart[];
}

const CartPayment: FunctionComponent<CartPaymentProps> = ({ cart }) => {
  const {
    register,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useUser();
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
    <CartPaymentForm>
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
      <label className="payment-form-label">
        <p>주문자 이름</p>
        <input type="text" />
      </label>
      <label className="payment-form-label">
        <p>주문자 번호</p>
        <input type="text" placeholder="-없이 숫자만 입력" />
      </label>
      <label className="payment-form-label">
        <p>주문자 이메일</p>
        <input type="text" value={user?.email} readOnly />
      </label>
      <label className="payment-form-label">
        <p>(필수) 구매조건 및 개인정보취급방침 동의</p>
        <input type="checkbox" />
      </label>
    </CartPaymentForm>
  );
};

export default CartPayment;

const CartPaymentForm = styled.form`
  width: 32.5rem;
  .payment-form-price {
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 2.5rem;
      font-weight: 500;
    }
  }
`;
