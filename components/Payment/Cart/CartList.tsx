import { FunctionComponent, useCallback, useEffect } from 'react';
import { CartContainerProps } from './CartContainer';
import styled from 'styled-components';
import fetchJson from '@/utils/lib/fetchJson';
import CartItem from './CartItem';
import { uid } from 'uid';

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
  return (
    <CartListContainer>
      <div className="cart-list-head">
        <span onClick={onRemoveAll}>전체삭제</span>
      </div>
      <ul>
        {cart.map((item) => (
          <li key={uid(10)}>
            <CartItem userUid={userUid} cartItem={item} mutate={mutate} />
          </li>
        ))}
      </ul>
    </CartListContainer>
  );
};

export default CartList;

const CartListContainer = styled.div`
  flex: 1;
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
