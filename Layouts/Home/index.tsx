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
    margin-top: 3rem;
  }
`;
