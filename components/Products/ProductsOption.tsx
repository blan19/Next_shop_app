import { FunctionComponent } from 'react';
import { ProductsLabel } from '.';

interface ProductsOptionProps {
  option: boolean;
  optionInfo: { contents: string }[] | null;
}

const ProductsOption: FunctionComponent<ProductsOptionProps> = ({
  option,
  optionInfo,
}) => {
  return (
    <ProductsLabel>
      <h1 className="products-label">Product Option</h1>
      <div className="products-divide" />
      <div className="products-contents">
        <div className="products-contents-wrapper">
          <span>상품 옵션</span>
        </div>
        {option ? 'test' : <b>단일 옵션</b>}
      </div>
    </ProductsLabel>
  );
};

export default ProductsOption;
