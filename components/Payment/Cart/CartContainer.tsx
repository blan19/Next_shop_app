import { ICart } from '@/types/cart.type';
import { flexCenter } from '@/utils/styles/Theme';
import dynamic from 'next/dynamic';
import { FunctionComponent } from 'react';
import { FaSadTear } from 'react-icons/fa';
import styled from 'styled-components';
import { KeyedMutator } from 'swr';
import CartList from './CartList';

const CartPayment = dynamic(() => import('./CartPayment'));

export interface CartContainerProps {
  cart: ICart[];
  cartUid: string;
  userUid: string;
  mutate: KeyedMutator<any>;
}

const CartContainer: FunctionComponent<CartContainerProps> = ({
  cart,
  userUid,
  cartUid,
  mutate,
}) => {
  return (
    <CartContainerBlock>
      {cart.length > 0 ? (
        <>
          <CartList
            cartUid={cartUid}
            mutate={mutate}
            userUid={userUid}
            cart={cart}
          />
          <CartPayment
            mutate={mutate}
            cartUid={cartUid}
            cart={cart}
            userUid={userUid}
          />
        </>
      ) : (
        <div className="payment-cart-no">
          <h1>
            장바구니 목록이 존재하지 않습니다.
            <FaSadTear />
          </h1>
        </div>
      )}
    </CartContainerBlock>
  );
};

export default CartContainer;

const CartContainerBlock = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
  .payment-cart-no {
    margin-top: 15rem;
    h1 {
      ${flexCenter}
      font-size: 3rem;
      svg {
        font-size: 4rem;
        margin-left: 1rem;
      }
    }
  }
`;
