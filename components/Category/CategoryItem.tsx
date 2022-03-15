import { IProduct } from '@/types/product.type';
import { flexCenter } from '@/utils/styles/Theme';
import { FunctionComponent } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import styled from 'styled-components';
import Thumbnail from '../Common/Thumbnail';

interface CategoryItemProps {
  product: IProduct;
}

const CategoryItem: FunctionComponent<CategoryItemProps> = ({ product }) => {
  return (
    <CategoryItemContainer>
      <Thumbnail
        images={product.thumbPath}
        width="230px"
        height="300px"
        radius
      />
      <div className="category-item-info">
        <h1>₩ {product.price}</h1>
        <p>{product.title}</p>
      </div>
      <div className="category-item-like">
        <IoHeartOutline />
      </div>
    </CategoryItemContainer>
  );
};

export default CategoryItem;

const CategoryItemContainer = styled.div`
  position: relative;
  cursor: pointer;
  .category-item-info {
    h1 {
      margin-top: 2rem;
      font-size: 1.75rem;
      color: var(--color-primaryText);
    }
    p {
      margin-top: 1rem;
      font-size: 1.5rem;
      color: var(--color-subText);
    }
  }
  .category-item-like {
    ${flexCenter}
    position: absolute;
    background: white;
    border-radius: rem;
    width: 4rem;
    height: 4rem;
    border-radius: 2rem;
    bottom: 9.5rem;
    right: 7.5rem;
    z-index: 99;
    svg {
      font-size: 3rem;
    }
    @media screen and (max-width: 1280px) {
      right: 8.5rem;
    }
    @media screen and (max-width: 1024px) {
      right: 2.5rem;
    }
    @media screen and (max-width: 768px) {
      width: 4rem;
      height: 4rem;
      right: 1.5rem;
      bottom: 8.5rem;
      svg {
        font-size: 3rem;
      }
    }
    @media screen and (max-width: 540px) {
      width: 2.5rem;
      height: 2.5rem;
      right: 1.5rem;
      bottom: 10.5rem;
      svg {
        font-size: 1.5rem;
      }
    }
    @media screen and (max-width: 400px) {
      width: 2.5rem;
      height: 2.5rem;
      right: 1.5rem;
      bottom: 12rem;
      svg {
        font-size: 1.5rem;
      }
    }
    @media screen and (max-width: 300px) {
    }
  }
`;
