import { ICart } from '@/types/cart.type';
import fetchJson from '@/utils/lib/fetchJson';
import Image from 'next/image';
import { FunctionComponent, useCallback } from 'react';
import styled from 'styled-components';
import { KeyedMutator } from 'swr';

interface CartItemProps {
  cartItem: ICart;
  userUid: string;
  mutate: KeyedMutator<any>;
}
const CartItem: FunctionComponent<CartItemProps> = ({
  cartItem,
  userUid,
  mutate,
}) => {
  const onRemove = useCallback(async () => {
    await fetchJson('/api/cart/remove', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartUid: cartItem.cartUid, userUid }),
    })
      .then(() => mutate())
      .catch(() => console.log('장바구니 아이템 삭제 실패'));
  }, [cartItem.cartUid, mutate, userUid]);
  return (
    <CartItemContainer>
      <div className="payment-cart-thumb">
        <Image
          src={cartItem.thumbUrl}
          width="85px"
          height="85px"
          alt="thumbnail"
        />
      </div>
      <div className="payment-cart-title">
        <p>{cartItem.title}</p>
        {cartItem.option && <span>{cartItem.option.join(' / ')}</span>}
      </div>
      <div className="payment-cart-price">
        <p>수량 : {cartItem.count}</p>
        <h1>
          ₩
          {Number(
            Number(cartItem.price) * Number(cartItem.count),
          ).toLocaleString('ko-Kr', { maximumFractionDigits: 4 })}
        </h1>
        <button onClick={onRemove}>바구니에서 삭제</button>
      </div>
    </CartItemContainer>
  );
};

export default CartItem;

const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-right: 2rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  padding: 1rem;
  border-radius: 0.5rem;
  @media screen and (max-width: 768px) {
    margin-right: 0;
  }
  .payment-cart-thumb {
    img {
      width: 100%;
    }
  }
  .payment-cart-title {
    margin: 0 1rem;
    width: 35rem;
    p {
      font-size: 2.5rem;
      font-weight: 300;
      color: var(--color-primaryText);
      margin-bottom: 1rem;
    }
    span {
      font-size: 1.5rem;
      font-weight: 300;
      color: var(--color-subText);
    }
  }
  .payment-cart-price {
    p {
      font-size: 1.5rem;
      font-weight: 300;
      color: var(--color-subText);
      margin-bottom: 1rem;
    }
    h1 {
      font-size: 2.5rem;
      color: var(--color-primaryText);
      font-weight: 500;
      margin-bottom: 1rem;
    }
    button {
      width: 100%;
      outline: none;
      background: var(--color-lightColor);
      border: 1px solid var(--color-subColor);
      padding: 0.5rem 1rem;
      font-size: 1.5rem;
      font-weight: 300;
      text-align: center;
      cursor: pointer;
      &:hover {
        border: 1px solid var(--color-subText);
      }
    }
  }
`;
