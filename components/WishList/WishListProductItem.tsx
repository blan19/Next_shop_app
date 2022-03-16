import { IProduct } from '@/types/product.type';
import { FunctionComponent } from 'react';

interface WishListProductItemProps {
  wish: IProduct;
}
const WishListProductItem: FunctionComponent<WishListProductItemProps> = ({
  wish,
}) => {
  return (
    <div>
      <h1>asdas</h1>
    </div>
  );
};

export default WishListProductItem;
