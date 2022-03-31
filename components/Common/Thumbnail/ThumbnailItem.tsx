import { SwiperSlide } from 'swiper/react';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface ThumbnailItemProps {
  image: string;
  width: string | number;
  height: string | number;
  radius?: boolean;
}

const ThumbnailItem: FunctionComponent<ThumbnailItemProps> = ({
  image,
  width,
  height,
  radius,
}) => {
  return (
    <SwiperSlideContainer className="thumbnail-slide">
      <Image
        src={image}
        width={width}
        height={height}
        alt="thumbnail"
        className={radius ? 'thumb-radius' : ''}
      />
    </SwiperSlideContainer>
  );
};

export default ThumbnailItem;

const SwiperSlideContainer = styled(SwiperSlide)`
  img {
    width: 100%;
    height: auto;
    border-radius: 0.5rem 0.5rem 0 0;
  }
  img.thumb-radius {
    border-radius: 2rem 2rem 2rem 2rem;
  }
`;
