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
      <div className="products-contents">
        <div className="products-contents-wrapper">
          <span>배송 업체</span>
        </div>
        <b>{company}</b>
      </div>
      <div className="products-contents">
        <div className="products-contents-wrapper">
          <span>배송비</span>
        </div>
        <b>{free ? `${cost}` : '무료배송'}</b>
      </div>
    </ProductsLabel>
  );
};

export default ProductsDelivery;
