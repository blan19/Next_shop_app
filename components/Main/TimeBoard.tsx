import { useMemo } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperProps } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import TimeBoardSwiper from './TimeBoardSwiper';

SwiperCore.use([Autoplay]);

const TimeBoard = () => {
  const swiperParams = useMemo<SwiperProps>(
    () => ({
      autoplay: {
        delay: 3000,
      },
    }),
    [],
  );
  return (
    <TimeBoardContainer>
      <Swiper {...swiperParams}>
        <TimeBoardSwiper />
      </Swiper>
    </TimeBoardContainer>
  );
};

export default TimeBoard;

const TimeBoardContainer = styled.section``;
