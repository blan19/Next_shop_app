import { FunctionComponent } from 'react';
import { ProductsLabel } from '.';

interface ProductPriceProps {
  price: string;
}

const ProductPrice: FunctionComponent<ProductPriceProps> = ({ price }) => {
  return (
    <ProductsLabel>
      <h1 className="products-label">Price Info</h1>
      <div className="products-divide" />
    </ProductsLabel>
  );
};

export default ProductPrice;
