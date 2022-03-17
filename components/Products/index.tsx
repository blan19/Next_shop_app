import { IProduct } from '@/types/product.type';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import Thumbnail from '../Common/Thumbnail';
import ProductPrice from './ProductPrice';
import ProductsDelivery from './ProductsDelivery';

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
`;
