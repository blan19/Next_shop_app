import { IProduct } from '@/types/product.type';
import { flexCenter } from '@/utils/styles/Theme';
import { FunctionComponent, useMemo } from 'react';
import styled from 'styled-components';
import Thumbnail from '../Common/Thumbnail';
import ProductInfo from './ProductInfo';
import ProductPrice from './ProductPrice';
import ProductsDelivery from './ProductsDelivery';
import ProductsForm from './ProductsForm';
import ProductsOption from './ProductsOption';
import ProductsSize from './ProductsSize';

interface ProductsProps {
  product: IProduct;
}

const Products: FunctionComponent<ProductsProps> = ({ product }) => {
  const options = useMemo(() => {
    if (product.size && product.option) {
      if (product.sizeInfo && product.optionInfo) {
        return [
          product.optionInfo.map((info) => ({
            value: info.contents,
            label: info.contents,
          })),
          product.sizeInfo.map((info) => ({
            value: info.size,
            label: info.size,
          })),
        ];
      }
    }
    if (product.size) {
      if (product.sizeInfo) {
        return [
          product.sizeInfo.map((info) => ({
            value: info.size,
            label: info.size,
          })),
        ];
      }
    }
    if (product.option) {
      if (product.optionInfo) {
        return [
          product.optionInfo.map((info) => ({
            value: info.contents,
            label: info.contents,
          })),
        ];
      }
    }
    return null;
  }, [product]);
  return (
    <ProductsContainer>
      <div className="products-title">
        <div className="products-title-category">
          <span>category &gt; </span>
          <p># {product.category}</p>
        </div>
        <h1>{product.title}</h1>
      </div>
      <div className="products-to">
        <div className="products-to-left">
          <Thumbnail images={product.thumbPath} width="400px" height="500px" />
        </div>
        <div className="products-to-right">
          <div className="products-to-right-info">
            <ProductsDelivery
              company={product.deliveryCompany}
              cost={product.deliveryCost}
              free={product.deliveryFree}
            />
            <ProductsOption
              option={product.option}
              optionInfo={product.optionInfo}
            />
            {/* <ProductsSize size={product.size} sizeInfo={product.sizeInfo} /> */}
            <ProductPrice price={product.price} />
          </div>
          <div className="products-to-right-payment">
            <ProductsForm options={options} product={product} />
          </div>
        </div>
      </div>
      <ProductInfo infoPath={product.infoPath} />
    </ProductsContainer>
  );
};

export default Products;

const ProductsContainer = styled.div`
  .products-title {
    margin-bottom: 2rem;
    .products-title-category {
      display: flex;
      font-size: 1.5rem;
      color: var(--color-subText);
      margin-bottom: 1rem;
      span {
      }
      p {
        padding-left: 0.5rem;
      }
    }
    h1 {
      color: var(--color-primaryText);
      font-size: 2.5rem;
    }
  }
  .products-to {
    display: flex;
    align-items: flex-start;
    @media screen and (max-width: 768px) {
      align-items: initial;
      flex-direction: column;
    }
    .products-to-left {
      ${flexCenter}
      padding: 2.5rem;
      border: 1px solid var(--color-subColor);
    }
    .products-to-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 4rem;
      @media screen and (max-width: 768px) {
        flex-direction: column-reverse;
        margin-left: 0;
      }
      .products-to-right-info {
        margin-top: 2rem;
      }
      .products-to-right-payment {
        margin-top: 2rem;
      }
    }
  }
`;

export const ProductsLabel = styled.label`
  .products-label {
    font-size: 2rem;
    font-weight: 300;
    margin-bottom: 1rem;
    color: var(--color-primaryText);
  }
  .products-divide {
    width: 100%;
    height: 1px;
    background: var(--color-subColor);
  }
  .products-contents {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    margin: 1.5rem 0;
    .products-contents-wrapper {
      width: 7.5rem;
      span {
        color: var(--color-primaryText);
      }
    }
    p {
      font-size: 2.5rem;
      font-weight: 400;
      color: var(--color-primaryText);
    }
    b {
      color: var(--color-primaryText);
    }
  }
  .products-size-table {
    margin-bottom: 1.5rem;
    border-spacing: 0;
    text-align: center;
    th {
      font-size: 1.5rem;
      padding: 0.65rem;
      color: var(--color-primaryText);
      background: var(--color-subColor);
      border: 0.15px solid var(--color-subText);
      font-weight: 400;
    }
    td {
      font-size: 1.25rem;
      color: var(--color-subText);
      border: 0.5px solid var(--color-subText);
    }
  }
`;
