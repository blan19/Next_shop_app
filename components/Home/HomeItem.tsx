import { IProduct } from '@/types/product.type';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import styled from 'styled-components';

interface HomeItemProps {
  product: IProduct;
}

const HomeItem: FunctionComponent<HomeItemProps> = ({ product }) => {
  const router = useRouter();
  return (
    <HomeSwiperSlide
      onClick={() => router.push(`/products/${product.uid}/${product.title}`)}
    >
      <Image
        src={product.thumbPath[0]}
        width="300px"
        height="400px"
        alt='"thumbnail'
      />
      <div className="home-product-info">
        <p>
          {product.title}
          <span>#{product.category.toLowerCase()}</span>
        </p>
        <h1>
          ₩
          {Number(product.price).toLocaleString('ko-Kr', {
            maximumFractionDigits: 4,
          })}
        </h1>
      </div>
    </HomeSwiperSlide>
  );
};

export default HomeItem;

const HomeSwiperSlide = styled.div`
  width: 100%;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
  .home-product-info {
    p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 1.5rem;
      margin-top: 1rem;
      color: var(--color-primaryText);
      font-weight: 300;
      span {
        color: var(--color-subText);
      }
    }
    h1 {
      font-size: 2rem;
      margin-top: 0.5rem;
      color: var(--color-primaryText);
      font-weight: 500;
    }
  }
`;
