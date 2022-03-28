import { IProduct } from '@/types/product.type';
import { FunctionComponent, useMemo } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import HomeItem from './HomeItem';
import 'swiper/css';

interface HomeListProps {
  products: IProduct[];
}

const HomeList: FunctionComponent<HomeListProps> = ({ products }) => {
  const swiperParams = useMemo<SwiperProps>(
    () => ({
      autoplay: {
        delay: 3000,
      },
      spaceBetween: 30,
      slidesPerView: 3,
      loop: true,
      centeredSlides: true,
      effect: 'fade',
    }),
    [],
  );
  return (
    <HomeListContainer>
      <HomeSwiper {...swiperParams}>
        {products.map((product) => {
          return (
            <SwiperSlide key={product.uid}>
              <HomeItem product={product} />
            </SwiperSlide>
          );
        })}
      </HomeSwiper>
    </HomeListContainer>
  );
};

export default HomeList;

const HomeListContainer = styled.div`
  width: 100%;
  margin-bottom: 5rem;
  .swiper {
    width: 100%;
  }
  .swiper-wrapper {
    width: 63.2rem;
  }
  .swiper-slide {
  }
`;

const HomeSwiper = styled(Swiper)``;
