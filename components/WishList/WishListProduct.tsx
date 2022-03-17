import useReadLocalStorage from '@/hooks/useReadLocalStorage';
import { IProduct } from '@/types/product.type';
import styled from 'styled-components';
import WishListProductItem from './WishListProductItem';
import { BsFillEmojiSmileFill, BsFillCartFill, BsXLg } from 'react-icons/bs';
import { flexCenter } from '@/utils/styles/Theme';

const WishListProduct = () => {
  const wish = useReadLocalStorage<IProduct[]>('wish');
  return wish && wish.length > 0 ? (
    <WishListProductContainer>
      {wish.map((product) => (
        <WishListProductItem
          key={product.uid}
          wish={product}
          cart={<BsFillCartFill />}
          remove={<BsXLg />}
        />
      ))}
    </WishListProductContainer>
  ) : (
    <MyNoProduct>
      <h1>위시리스트가 존재하지 않습니다 </h1>
      <BsFillEmojiSmileFill />
    </MyNoProduct>
  );
};

export default WishListProduct;

export const MyNoProduct = styled.div`
  ${flexCenter}
  margin-top: 20rem;
  h1 {
    font-size: 3rem;
    margin-right: 1.5rem;
  }
  svg {
    font-size: 3.5rem;
  }
`;

const WishListProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 2rem;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
`;
