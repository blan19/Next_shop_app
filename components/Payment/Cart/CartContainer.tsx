import dynamic from 'next/dynamic';
import styled from 'styled-components';
import CartList from './CartList';

const CartPayment = dynamic(() => import('./CartPayment'));

const CartContainer = () => {
  return (
    <CartContainerBlock>
      <CartList />
      <CartPayment />
    </CartContainerBlock>
  );
};

export default CartContainer;

const CartContainerBlock = styled.div`
  display: flex;
`;
