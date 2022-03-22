import { FunctionComponent, useCallback, useEffect } from 'react';
import { CartContainerProps } from './CartContainer';
import styled from 'styled-components';
import fetchJson from '@/utils/lib/fetchJson';

const CartList: FunctionComponent<CartContainerProps> = ({
  cart,
  userUid,
  mutate,
}) => {
  const onRemoveAll = useCallback(async () => {
    await fetchJson('/api/cart/removeAll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userUid }),
    }).then(() => {
      console.log('카트 목록 전체삭제 성공');
      mutate();
    });
  }, [mutate, userUid]);

  useEffect(() => {
    console.log(cart);
  }, [cart]);
  return (
    <CartListContainer>
      <div className="cart-list-head">
        <span onClick={onRemoveAll}>전체삭제</span>
      </div>
      <h1>Cart List</h1>
    </CartListContainer>
  );
};

export default CartList;

const CartListContainer = styled.div`
  .cart-list-head {
    margin-bottom: 2rem;
    span {
      cursor: pointer;
      color: var(--color-subText);
      font-size: 1.5rem;
      border-bottom: 1.5px solid var(--color-subText);
    }
  }
`;
