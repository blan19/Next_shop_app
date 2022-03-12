import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useQueryParser from '@/hooks/useQueryParser';
import { IProduct } from '@/types/product.type';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import EditProductItem from './EditProductItem';

interface EditProductListProps {
  products: IProduct[];
}

const EditProductList: FunctionComponent<EditProductListProps> = ({
  products,
}) => {
  const query = useQueryParser();
  const { containerRef, products: filteredProducts } = useInfiniteScroll(
    query,
    products,
  );

  return (
    <EditProductListContainer ref={containerRef}>
      {filteredProducts && filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <EditProductItem key={product.title} product={product} />
        ))
      ) : (
        <EditProductListNoItem>
          <h1>No Product</h1>
          <p>해당 카테고리 상품이 존재하지 않습니다.</p>
        </EditProductListNoItem>
      )}
    </EditProductListContainer>
  );
};

export default EditProductList;

const EditProductListContainer = styled.div``;

const EditProductListNoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 5rem;
    color: var(--color-primaryText);
  }
  p {
    margin-top: 2rem;
    font-size: 1.5rem;
    color: var(--color-subText);
  }
`;
