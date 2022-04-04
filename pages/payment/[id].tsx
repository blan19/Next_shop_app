import CartContainer from '@/components/Payment/Cart/CartContainer';
import useUser from '@/hooks/useUser';
import { flexCenter } from '@/utils/styles/Theme';
import Layouts from 'Layouts';
import { useRouter } from 'next/router';
import { WishListResponsive } from 'pages/wishlist';
import { useEffect } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

const Cart = () => {
  const {
    query: { id },
  } = useRouter();
  const router = useRouter();
  const { user } = useUser();
  const { data: cartData, mutate } = useSWR(id ? `/api/cart/${id}` : null);
  useEffect(() => {
    if (user) {
      if (!user.isLoggedIn) {
        router.push('/');
      }
      if (user.isLoggedIn && id !== user.uid) {
        router.push('/');
      }
    }
  }, [id, router, user]);
  return (
    <Layouts
      title="Payment"
      description={`상품 결제를 위한 페이지`}
      image={null}
      url={
        process.env.NEXT_PULBIC_URL
          ? process.env.NEXT_PULBIC_URL
          : 'http://localhost:3000'
      }
    >
      <CartResponsive>
        {cartData && cartData.success ? (
          <>
            <div className="list-info">
              <h1>장바구니</h1>
            </div>
            <CartContainer
              cart={cartData.data.cart}
              cartUid={cartData.data.uid}
              userUid={cartData.data.user}
              mutate={mutate}
            />
          </>
        ) : (
          <div className="list-error">
            <h1>장바구니에 상품을 추가해보세요!</h1>
          </div>
        )}
      </CartResponsive>
    </Layouts>
  );
};

export default Cart;

export const CartResponsive = styled(WishListResponsive)`
  .list-error {
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
