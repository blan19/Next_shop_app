import useReadLocalStorage from '@/hooks/useReadLocalStorage';
import { IProduct } from '@/types/product.type';
import { useEffect } from 'react';
const WishListProduct = () => {
  const wish = useReadLocalStorage<IProduct[]>('wish');
  useEffect(() => {
    console.log(wish);
  }, [wish]);
  return (
    <div>
      <h1>asdas</h1>
    </div>
  );
};

export default WishListProduct;
