import CartContainer from '@/components/Payment/Cart/CartContainer';
import Layouts from 'Layouts';
import { ListResponsive } from 'pages/wishlist';

const Cart = () => {
  return (
    <Layouts>
      <ListResponsive>
        <div className="list-info">
          <h1>장바구니</h1>
        </div>
        <CartContainer />
      </ListResponsive>
    </Layouts>
  );
};

export default Cart;
