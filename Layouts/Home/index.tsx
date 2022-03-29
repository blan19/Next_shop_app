import NavBar from '@/components/Common/NavBar';
import TimeBoard from '@/components/Main/TimeBoard';
import Responsive from '@/utils/styles/Responsive';
import { FunctionComponent } from 'react';
import styled from 'styled-components';

const Home: FunctionComponent = ({ children }) => {
  return (
    <HomeContainer>
      <TimeBoard />
      <div className="home-contents-wrapper">
        <NavBar />
        {children}
      </div>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled(Responsive)`
  margin-top: 3rem;
  .home-contents-wrapper {
    display: flex;
    align-items: flex-start;
    margin-top: 3rem;
    @media screen and (max-width: 768px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;
