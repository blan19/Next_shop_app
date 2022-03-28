import useLocalStorage from '@/hooks/useLocalStorage';
import useUser from '@/hooks/useUser';
import { IProduct } from '@/types/product.type';
import { flexCenter } from '@/utils/styles/Theme';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import styled from 'styled-components';
import Modal from '../Common/Modal';
import Thumbnail from '../Common/Thumbnail';

interface CategoryItemProps {
  product: IProduct;
}

const CategoryItem: FunctionComponent<CategoryItemProps> = ({ product }) => {
  const { user } = useUser();
  const router = useRouter();
  const [wish, setWish] = useLocalStorage<IProduct[]>('wish', []);
  const [visible, setVisible] = useState(false);
  return (
    <CategoryItemContainer>
      <Thumbnail images={product.thumbPath} width={230} height={300} radius />
      <Link href={`/products/${product.uid}/${product.title}`} passHref>
        <div className="category-item-info">
          <h1>
            ₩{' '}
            {Number(product.price).toLocaleString('ko-KR', {
              maximumFractionDigits: 4,
            })}
          </h1>
          <p>{product.title}</p>
        </div>
      </Link>
      <div className="category-item-like">
        {wish.some((item) => item.uid === product.uid) ? (
          <IoHeart
            className="category-item-selected"
            onClick={() => {
              if (!user?.isLoggedIn) {
                setVisible(true);
                return;
              }
              setWish((prev) =>
                prev.filter((item) => item.uid !== product.uid),
              );
            }}
          />
        ) : (
          <IoHeartOutline
            onClick={() => {
              if (!user?.isLoggedIn) {
                setVisible(true);
                return;
              }
              setWish((prev) => prev.concat(product));
            }}
          />
        )}
      </div>
      <Modal visible={visible} setVisible={setVisible}>
        <h1>로그인이 필요합니다</h1>
        <div className="modal-button">
          <button
            onClick={() => {
              setVisible((prev) => !prev);
              router.push('/auth/login');
            }}
          >
            로그인
          </button>
          <button onClick={() => setVisible((prev) => !prev)}>돌아가기</button>
        </div>
      </Modal>
    </CategoryItemContainer>
  );
};

export default CategoryItem;

const CategoryItemContainer = styled.div`
  position: relative;
  .category-item-info {
    cursor: pointer;
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
      cursor: pointer;
      font-size: 3rem;
    }
    svg.category-item-selected {
      color: red;
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
      bottom: 9rem;
      svg {
        font-size: 1.5rem;
      }
    }
    @media screen and (max-width: 400px) {
      width: 2.5rem;
      height: 2.5rem;
      right: 1.5rem;
      bottom: 10rem;
      svg {
        font-size: 1.5rem;
      }
    }
  }
`;
