import { flexCenter, flexColCenter } from '@/utils/styles/Theme';
import Image from 'next/image';
import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';

const TiemBoardSwiper = () => {
  return (
    <CustomSwiperSlide className="swiper-contents">
      <div className="swiper-image-container">
        <Image
          src={'/images/shop.png'}
          layout="fill"
          objectFit="cover"
          alt="timeboard"
        />
      </div>
      <div className="swiper-text-container">
        <div className="swiper-text-wrapper">
          <p>$20 OFF $100 PLUS</p>
          <p>GET FREE NEXT-DAY DELIVERY</p>
          <span>Enjoy our sales</span>
        </div>
      </div>
    </CustomSwiperSlide>
  );
};

export default TiemBoardSwiper;

const CustomSwiperSlide = styled(SwiperSlide)`
  .swiper-image-container {
    img {
      z-index: -1;
      border-radius: 2.5rem;
    }
  }
  .swiper-text-container {
    width: 100%;
    height: 35rem;
    z-index: 1;
    ${flexCenter}
    .swiper-text-wrapper {
      background: black;
      background: rgba(0, 0, 0, 0.4);
      ${flexColCenter}
      color: #fff;
      padding: 1rem 1rem;
      p {
        margin-bottom: 0.25rem;
        font-size: 3rem;
        font-weight: bold;
      }
      span {
        margin-top: 1rem;
        font-size: 1.4rem;
      }
    }
  }
`;
