import HomeList from '@/components/Home/HomeList';
import Home from 'Layouts/Home';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import styled from 'styled-components';
import Layouts from '../Layouts';

const Index: NextPage = ({
  popular,
  recent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layouts>
      <Home>
        <IndexContainer>
          <IndexContainerTitle>
            <h1>Best 5</h1>
            <p>view more</p>
          </IndexContainerTitle>
          <HomeList products={popular} />
          <IndexContainerTitle>
            <h1>New Arrival</h1>
            <p>view more</p>
          </IndexContainerTitle>
          <HomeList products={recent} />
        </IndexContainer>
      </Home>
    </Layouts>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const products = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/home/read`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
  return {
    props: {
      popular: products.data.popular,
      recent: products.data.recent,
    },
  };
};

const IndexContainer = styled.div`
  flex: 1;
`;

const IndexContainerTitle = styled.div`
  margin-bottom: 3rem;
  h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
    color: var(--color-primaryText);
  }
  p {
    font-size: 2rem;
    color: var(--color-subText);
  }
`;
