import useLocalStorage from '@/hooks/useLocalStorage';
import { IProduct } from '@/types/product.type';
import { flexCenter } from '@/utils/styles/Theme';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import styled from 'styled-components';

interface WishListProductItemProps {
  wish: IProduct;
  cart: JSX.Element;
  remove: JSX.Element;
}
const WishListProductItem: FunctionComponent<WishListProductItemProps> = ({
  wish,
  remove,
}) => {
  const router = useRouter();
  const [, setProduct] = useLocalStorage<IProduct[]>('wish', []);
  return (
    <WishListProductItemContainter>
      <Image
        onClick={() => router.push(`/products/${wish.uid}/${wish.title}`)}
        src={wish.thumbPath[0]}
        width={180}
        height={200}
        alt="wish"
      />
      <div
        className="wish-item-info"
        onClick={() => router.push(`/products/${wish.uid}/${wish.title}`)}
      >
        <h1>
          ₩{' '}
          {Number(wish.price).toLocaleString('ko-Kr', {
            maximumFractionDigits: 4,
          })}
        </h1>
        <p>{wish.title}</p>
      </div>
      <div className="wish-item-category">
        <p># {wish.category.toLowerCase()}</p>
        <div className="wish-item-button">
          <div
            className="wish-item-remove"
            onClick={() =>
              setProduct((prev) => prev.filter((item) => item.uid !== wish.uid))
            }
          >
            {remove}
          </div>
        </div>
      </div>
    </WishListProductItemContainter>
  );
};

export default WishListProductItem;

const WishListProductItemContainter = styled.div`
  cursor: pointer;
  .wish-item-info {
    margin-top: 1rem;
    h1 {
      font-size: 1.5rem;
      color: var(--color-primaryText);
    }
    p {
      margin-top: 0.5rem;
      font-size: 1.25rem;
      color: var(--color-subText);
    }
  }
  .wish-item-category {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: 1.25rem;
      color: var(--color-primaryText);
    }
    .wish-item-button {
      ${flexCenter}
      svg {
        font-size: 2rem;
        color: var(--color-primaryText);
        margin-left: 1rem;
      }
    }
  }
`;
