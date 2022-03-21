import { IProduct } from '@/types/product.type';
import { FunctionComponent, useCallback, useState } from 'react';
import styled from 'styled-components';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { flexCenter } from '@/utils/styles/Theme';
import useLocalStorage from '@/hooks/useLocalStorage';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import Modal from '../Common/Modal';
import fetchJson from '@/utils/lib/fetchJson';

interface ProductButtonProps {
  cart:
    | {
        title: string;
        option: string[] | null;
        price: string;
        count: number;
      }[]
    | null;
  product: IProduct;
}

const ProductButton: FunctionComponent<ProductButtonProps> = ({
  cart,
  product,
}) => {
  const { user } = useUser();
  const [wish, setWish] = useLocalStorage<IProduct[]>('wish', []);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const onClickMoveCart = useCallback(async () => {
    if (cart) {
      if (product.option) {
        await fetchJson('/api/cart/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            products: cart,
            userUid: user?.uid,
          }),
        })
          .then(() => console.log('카트 목록 업데이트'))
          .catch((error) => setError(error));
      } else {
      }
    } else {
      setError('❌  주문 목록이 존재하지 않습니다.');
    }
  }, [cart, product.option, user?.uid]);

  return (
    <ProductButtonContainer>
      <button
        type="button"
        className="products-button-payment"
        onClick={() => {
          if (!user?.isLoggedIn) {
            setVisible(true);
            return;
          }
          onClickMoveCart();
        }}
      >
        구매하기
      </button>
      <button type="button" className="products-button-wish">
        {wish.some((item) => item.uid === product.uid) ? (
          <IoHeart
            className="products-button-wish-selected"
            onClick={() => {
              if (!user?.isLoggedIn) {
                setVisible(true);
                return;
              }
              setWish((prev) =>
                prev.filter((item) => item.uid !== product.uid),
              );
            }}
          />
        ) : (
          <IoHeartOutline
            onClick={() => {
              if (!user?.isLoggedIn) {
                setVisible(true);
                return;
              }
              setWish((prev) => prev.concat(product));
            }}
          />
        )}
      </button>
      <Modal visible={visible} setVisible={setVisible}>
        <h1>로그인이 필요합니다</h1>
        <div className="modal-button">
          <button
            onClick={() => {
              setVisible((prev) => !prev);
              router.push('/auth/login');
            }}
          >
            로그인
          </button>
          <button onClick={() => setVisible((prev) => !prev)}>돌아가기</button>
        </div>
      </Modal>
    </ProductButtonContainer>
  );
};

export default ProductButton;

const ProductButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1rem;
  button {
    outline: none;
    border: none;
    cursor: pointer;
  }
  .products-button-payment {
    color: var(--color-rPrimaryText);
    padding: 0.5rem 2rem;
    background: var(--color-mainColor);
    font-size: 2.5rem;
    border-radius: 0.5rem;
    margin-right: 1rem;
  }
  .products-button-wish {
    ${flexCenter}
    padding: 0.5rem 2rem;
    font-size: 2.4rem;
    background: none;
    border: 1px solid var(--color-lightColor);
    border-radius: 0.5rem;
    color: var(--color-subText);
    .products-button-wish-selected {
      color: red;
    }
  }
`;
