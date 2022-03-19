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
      <div className="products-contents">
        <div className="products-contents-wrapper">
          <span>판매 가격</span>
        </div>
        <p>
          {Number(price).toLocaleString('ko-KR', { maximumFractionDigits: 4 })}₩
        </p>
      </div>
    </ProductsLabel>
  );
};

export default ProductPrice;
