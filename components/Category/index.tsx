import { FunctionComponent, useMemo } from 'react';
import styled from 'styled-components';

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

const CategoryList: FunctionComponent<CategoryListProps> = ({ category }) => {
  return (
    <CategoryListContainer>
      <CategoryListTitle category={category} />
    </CategoryListContainer>
  );
};

export default CategoryList;

const CategoryListContainer = styled.div``;

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
