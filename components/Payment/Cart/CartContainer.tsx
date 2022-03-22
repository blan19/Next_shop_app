import { ICart } from '@/types/cart.type';
import dynamic from 'next/dynamic';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { KeyedMutator } from 'swr';
import CartList from './CartList';

const CartPayment = dynamic(() => import('./CartPayment'));

export interface CartContainerProps {
  cart: ICart[];
  userUid: string;
  mutate: KeyedMutator<any>;
}

const CartContainer: FunctionComponent<CartContainerProps> = ({
  cart,
  userUid,
  mutate,
}) => {
  return (
    <CartContainerBlock>
      <CartList mutate={mutate} userUid={userUid} cart={cart} />
      <CartPayment />
    </CartContainerBlock>
  );
};

export default CartContainer;

const CartContainerBlock = styled.div`
  display: flex;
`;
