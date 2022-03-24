import Home from 'Layouts/Home';
import { NextPage } from 'next';
import styled from 'styled-components';
import Layouts from '../Layouts';

const Index: NextPage = () => {
  return (
    <Layouts>
      <Home>
        <IndexContainer>
          <IndexContainerTitle>
            <h1>Best 5</h1>
            <p>view more</p>
          </IndexContainerTitle>
          <IndexContainerTitle>
            <h1>New Arrival</h1>
            <p>view more</p>
          </IndexContainerTitle>
        </IndexContainer>
      </Home>
    </Layouts>
  );
};

export default Index;

const IndexContainer = styled.div``;

const IndexContainerTitle = styled.div`
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
