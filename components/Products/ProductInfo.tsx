import { flexCenter } from '@/utils/styles/Theme';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { FaSadTear } from 'react-icons/fa';

interface ProductInfoProps {
  infoPath: string[] | null;
}

const ProductInfo: FunctionComponent<ProductInfoProps> = ({ infoPath }) => {
  return (
    <ProductInfoContainer>
      <div className="products-info-title">
        <h1>Product Info</h1>
        <span>상품 정보</span>
      </div>
      {infoPath || (
        <div className="products-info-no-contents">
          <h1>상품 정보가 없습니다</h1>
          <FaSadTear />
        </div>
      )}
    </ProductInfoContainer>
  );
};

export default ProductInfo;

const ProductInfoContainer = styled.div`
  margin-top: 5rem;
  border-top: 1px solid var(--color-subColor);
  .products-info-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 1rem;
    h1 {
      color: var(--color-primaryText);
      font-size: 2rem;
      margin-right: 0.75rem;
    }
    span {
      font-size: 1.25rem;
      color: var(--color-subText);
    }
  }
  .products-info-no-contents {
    ${flexCenter}
    margin-top: 3rem;
    color: var(--color-primaryText);
    h1 {
      margin-right: 0.5rem;
      font-size: 2rem;
    }
    svg {
      font-size: 3rem;
    }
  }
`;
