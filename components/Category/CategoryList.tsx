import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { IProduct } from '@/types/product.type';
import { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import { EditProductListNoItem } from '../admin/Edit/EditProductList';
import CategoryItem from './CategoryItem';

interface CategoryListProps {
  products: IProduct[];
  category: string;
}

const CategoryList: FunctionComponent<CategoryListProps> = ({
  products,
  category,
}) => {
  const { containerRef, products: categories } = useInfiniteScroll(
    category,
    products,
  );

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <CategoryListContainer>
      {categories.length > 0 ? (
        <CategoryListWrapper ref={containerRef}>
          {categories.map((product) => (
            <CategoryItem key={product.uid} product={product} />
          ))}
        </CategoryListWrapper>
      ) : (
        <EditProductListNoItem>
          <h1>No Product</h1>
          <p>해당 카테고리 상품이 존재하지 않습니다.</p>
        </EditProductListNoItem>
      )}
    </CategoryListContainer>
  );
};

export default CategoryList;

const CategoryListContainer = styled.div`
  margin-top: 4rem;
`;

const CategoryListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;
