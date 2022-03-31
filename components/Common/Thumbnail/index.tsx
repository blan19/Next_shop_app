import dynamic from 'next/dynamic';
import { FunctionComponent, useMemo } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperProps } from 'swiper/react';
const ThumbnailItem = dynamic(() => import('./ThumbnailItem'), { ssr: true });

interface ThumbnailProps {
  images: string[];
  width: string | number;
  height: string | number;
  radius?: boolean;
}

const Thumbnail: FunctionComponent<ThumbnailProps> = ({
  images,
  width,
  height,
  radius,
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
        <ThumbnailItem
          key={idx}
          image={image}
          width={width}
          height={height}
          radius={radius}
        />
      ))}
    </SwiperContainer>
  );
};

export default Thumbnail;

const SwiperContainer = styled(Swiper)``;
