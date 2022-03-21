import Layouts from 'Layouts';
import { useEffect } from 'react';

const Cart = () => {
  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.8.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);
  return (
    <Layouts>
      <h1>asdasd</h1>
    </Layouts>
  );
};

export default Cart;
