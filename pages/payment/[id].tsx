import CartContainer from '@/components/Payment/Cart/CartContainer';
import { flexCenter } from '@/utils/styles/Theme';
import Layouts from 'Layouts';
import { useRouter } from 'next/router';
import { WishListResponsive } from 'pages/wishlist';
import { FaSadTear } from 'react-icons/fa';
import styled from 'styled-components';
import useSWR from 'swr';

const Cart = () => {
  const {
    query: { id },
  } = useRouter();
  const { data: cartData, mutate } = useSWR(id ? `/api/cart/${id}` : null);
  return (
    <Layouts>
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
            <h1>
              존재하지 않은 주소입니다.
              <FaSadTear />
            </h1>
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
