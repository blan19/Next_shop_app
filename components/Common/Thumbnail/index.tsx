import { FunctionComponent, useMemo } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperProps } from 'swiper/react';
import ThumbnailItem from './ThumbnailItem';

interface ThumbnailProps {
  images: string[];
  width: string;
  height: string;
}

const Thumbnail: FunctionComponent<ThumbnailProps> = ({
  images,
  width,
  height,
}) => {
  const swiperParams = useMemo<SwiperProps>(
    () => ({
      autoplay: {
        delay: 3000,
      },
    }),
    [],
  );
  return (
    <SwiperContainer className="thumbnail-swiper" {...swiperParams}>
      {images.map((image, idx) => (
        <ThumbnailItem key={idx} image={image} width={width} height={height} />
      ))}
    </SwiperContainer>
  );
};

export default Thumbnail;

const SwiperContainer = styled(Swiper)``;
