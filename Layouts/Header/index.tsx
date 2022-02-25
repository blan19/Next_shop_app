import React from 'react';
import styled from 'styled-components';
import useDarkMode from 'use-dark-mode';

const Header = () => {
  const darkMode = useDarkMode(false);
  return (
    <HeaderContainer>
      <h1>asdasd</h1>
      <button onClick={() => darkMode.toggle()}>darkToggle</button>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  h1 {
    color: ${(props) => props.theme.fontColor};
  }
`;
