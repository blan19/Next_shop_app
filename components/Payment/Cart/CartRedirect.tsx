import { IPayment } from '@/types/pay.type';
import convertDate from '@/utils/lib/convertDate';
import { flexColCenter } from '@/utils/styles/Theme';
import { FunctionComponent } from 'react';
import styled from 'styled-components';

interface CartRedirectProps {
  receipt: IPayment;
  success: string;
}

const CartRedirect: FunctionComponent<CartRedirectProps> = ({
  receipt,
  success,
}) => {
  const date = convertDate(receipt.createAt.seconds);
  return (
    <CartRedirectContainer>
      {success === 'true' ? (
        <>
          <div className="payment-redirect-indicator">
            <h1>주문이 완료되었습니다</h1>
          </div>
          <div className="payment-redirect-info">
            <p>{receipt.paymentData.name}</p>
            <p>{date}</p>
          </div>
          <div className="payment-redirect-buyer">
            <p>주문 정보</p>
            <span>{receipt.paymentData.buyer_name}</span>
            <span>{receipt.paymentData.buyer_email}</span>
            <span>{receipt.paymentData.buyer_tel}</span>
            <span>{receipt.paymentData.buyer_addr}</span>
            <span>
              ₩
              {receipt.paymentData.amount.toLocaleString('ko-Kr', {
                maximumFractionDigits: 4,
              })}
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="payment-redirect-indicator">
            <h1>주문에 실패했습니다</h1>
            <button>Home</button>
          </div>
        </>
      )}
    </CartRedirectContainer>
  );
};

export default CartRedirect;

const CartRedirectContainer = styled.div`
  ${flexColCenter}
  margin-top: 15rem;
  .payment-redirect-indicator {
    ${flexColCenter}
    h1 {
      font-size: 3.5rem;
      font-weight: 400;
      color: var(--color-primaryText);
      margin-bottom: 5rem;
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
  .payment-redirect-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    p {
      font-size: 2rem;
      font-weight: 300;
      color: var(--color-primaryText);
      margin-bottom: 1rem;
    }
  }
  .payment-redirect-buyer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 1rem;
    p {
      font-size: 3rem;
      color: var(--color-primaryText);
      margin-bottom: 1rem;
    }
    span {
      font-size: 2rem;
      font-weight: 300;
      margin: 0.5rem 0;
      color: var(--color-primaryText);
    }
  }
`;
