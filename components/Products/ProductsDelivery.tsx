import { FunctionComponent } from 'react';
import { ProductsLabel } from '.';

interface ProductsDeliveryProps {
  company: string;
  cost: null | string;
  free: boolean;
}
const ProductsDelivery: FunctionComponent<ProductsDeliveryProps> = ({
  company,
  cost,
  free,
}) => {
  return (
    <ProductsLabel>
      <h1 className="products-label">Delivery Info</h1>
      <div className="products-divide" />
    </ProductsLabel>
  );
};

export default ProductsDelivery;
