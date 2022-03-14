import { SwiperSlide } from 'swiper/react';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface ThumbnailItemProps {
  image: string;
  width: string;
  height: string;
}

const ThumbnailItem: FunctionComponent<ThumbnailItemProps> = ({
  image,
  width,
  height,
}) => {
  return (
    <SwiperSlideContainer className="thumbnail-slide">
      <Image src={image} width={width} height={height} alt="thumbnail" />
    </SwiperSlideContainer>
  );
};

export default ThumbnailItem;

const SwiperSlideContainer = styled(SwiperSlide)`
  img {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem 0.5rem 0 0;
  }
`;
