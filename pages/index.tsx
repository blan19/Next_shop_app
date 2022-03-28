import HomeList from '@/components/Home/HomeList';
import { firebaseDb } from '@/utils/firebase/clientApp';
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
  try {
    const snapshotByCount = await firebaseDb
      .collection('products')
      .orderBy('count', 'desc')
      .limit(5)
      .get();
    const popular = snapshotByCount.docs.map((doc) => doc.data());
    const snapshotByDate = await firebaseDb
      .collection('products')
      .orderBy('createAt', 'desc')
      .limit(5)
      .get();
    const recent = snapshotByDate.docs.map((doc) => doc.data());
    return {
      props: {
        popular: JSON.parse(JSON.stringify(popular)),
        recent: JSON.parse(JSON.stringify(recent)),
      },
    };
  } catch (error) {
    throw error;
  }
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
