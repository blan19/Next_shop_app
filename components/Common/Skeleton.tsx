import ContentLoader from 'react-content-loader';
import styled from 'styled-components';

const SkeletonContents = () => {
  return (
    <ContentLoader
      speed={2}
      width={'100%'}
      viewBox="0 0 400 160"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    ></ContentLoader>
  );
};

export default function Skeleton() {
  return (
    <ContentLoaderContainer>
      <SkeletonContents />
      <SkeletonContents />
      <SkeletonContents />
      <SkeletonContents />
      <SkeletonContents />
      <SkeletonContents />
      <SkeletonContents />
      <SkeletonContents />
      <SkeletonContents />
      <SkeletonContents />
      <SkeletonContents />
      <SkeletonContents />
      <SkeletonContents />
      <SkeletonContents />
    </ContentLoaderContainer>
  );
}

const ContentLoaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2rem;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
