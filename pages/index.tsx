import Home from 'Layouts/Home';
import { NextPage } from 'next';
import styled from 'styled-components';
import Layouts from '../Layouts';

const Index: NextPage = () => {
  return (
    <Layouts>
      <Home>
        <IndextContainer>
          <h1>asd</h1>
        </IndextContainer>
      </Home>
    </Layouts>
  );
};

export default Index;

const IndextContainer = styled.div``;
