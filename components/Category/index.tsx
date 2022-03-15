import { IProduct } from '@/types/product.type';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import CategoryList from './CategoryList';

interface CategoryListProps {
  category: string;
}
const CategoryListTitle: FunctionComponent<CategoryListProps> = ({
  category,
}) => {
  return (
    <CategoryListTitleContainer>
      <h1>{category}</h1>
      <p>View more</p>
    </CategoryListTitleContainer>
  );
};

const Category: FunctionComponent<CategoryListProps> = ({ category }) => {
  const { data: products } = useSWR<IProduct[]>('/api/products/product');
  return (
    <CategoryContainer>
      <CategoryListTitle category={category} />
      {products && <CategoryList products={products} category={category} />}
    </CategoryContainer>
  );
};

export default Category;

const CategoryContainer = styled.div`
  flex: 1;
`;

const CategoryListTitleContainer = styled.div`
  h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
    color: var(--color-primaryText);
  }
  p {
    font-size: 2rem;
    color: var(--color-subText);
  }
`;
