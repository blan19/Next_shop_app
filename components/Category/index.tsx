import { IProduct } from '@/types/product.type';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import CategoryList from './CategoryList';

interface CategoryListProps {
  products: IProduct[];
  category: string;
}

interface CategoryListTitleProps {
  category: string;
}
const CategoryListTitle: FunctionComponent<CategoryListTitleProps> = ({
  category,
}) => {
  return (
    <CategoryListTitleContainer>
      <h1>{category}</h1>
      <p>View more</p>
    </CategoryListTitleContainer>
  );
};

const Category: FunctionComponent<CategoryListProps> = ({
  products,
  category,
}) => {
  return (
    <CategoryContainer>
      <CategoryListTitle category={category} />
      <CategoryList products={products} />
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
