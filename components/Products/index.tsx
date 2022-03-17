import { IProduct } from '@/types/product.type';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import Thumbnail from '../Common/Thumbnail';
import ProductPrice from './ProductPrice';
import ProductsDelivery from './ProductsDelivery';
import ProductsOption from './ProductsOption';
import ProductsSize from './ProductsSize';

interface ProductsProps {
  product: IProduct;
}

const Products: FunctionComponent<ProductsProps> = ({ product }) => {
  console.log(product);

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
          <Thumbnail
            images={product.thumbPath}
            width="350px"
            height="450px"
            radius
          />
        </div>
        <div className="products-to-right">
          <ProductsDelivery
            company={product.deliveryCompany}
            cost={product.deliveryCost}
            free={product.deliveryFree}
          />
          <ProductsOption
            option={product.option}
            optionInfo={product.optionInfo}
          />
          <ProductsSize size={product.size} sizeInfo={product.sizeInfo} />
          <ProductPrice price={product.price} />
        </div>
      </div>
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
    .products-to-right {
      flex: 1;
      margin-left: 4rem;
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
    height: 1.5px;
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
      font-size: 3rem;
      font-weight: bold;
      color: var(--color-primaryText);
    }
    b {
      color: var(--color-primaryText);
    }
  }
  .products-size-table {
    margin-bottom: 1.5rem;
    /* border: 1px solid var(--color-subText); */
    border-spacing: 0;
    font-size: 1.75rem;
    text-align: center;
    th {
      padding: 1rem;
      color: var(--color-primaryText);
      background: var(--color-subColor);
      border: 0.15px solid var(--color-subText);
    }
    td {
      color: var(--color-primaryText);
      border: 0.5px solid var(--color-subText);
    }
  }
`;
