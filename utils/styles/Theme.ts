import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  a,
  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
  li {
    list-style: none;
  }
`;

export interface Theme {
  fontColor: string;
}

interface ThemeGroup {
  darkTheme: Theme;
  lightTheme: Theme;
}

/**
 * @dark theme
 */
export const darkTheme: Theme = {
  fontColor: '#fff',
};

/**
 * @light theme
 */
export const lightTheme: Theme = {
  fontColor: '#000',
};

const ThemeMode: ThemeGroup = {
  darkTheme,
  lightTheme,
};

export default ThemeMode;
