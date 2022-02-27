import { css } from 'styled-components';

export const Theme = {
  light: {
    /**
     * Background Color
     */
    secondaryBackground: '#fafafa',
    /**
     * Text Colors
     */
    fontColor: '#000',
  },
  dark: {
    /**
     * Background Color
     */
    primaryBackground: '#181818',
    secondaryBackground: '#0E141B',
    /**
     * Text Colors
     */
    fontColor: '#fff',
  },
};

export const flexCenter = () => css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexColCenter = () => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export interface Theme {
  fontColor: string;
  mainColor: string;
  subColor: string;
  bgColor: string;
  hoverColor: string;
  rFontColor: string;
  fontSubColor: string;
}

interface ThemeGroup {
  darkTheme: Theme;
  lightTheme: Theme;
}

/**
 * @dark theme
 */
export const darkTheme: Theme = {
  bgColor: '#1E1E21',
  fontColor: '#fff',
  rFontColor: '#000',
  fontSubColor: '#D7D7D7',
  mainColor: '#F5B3D5',
  subColor: '#292A2D',
  hoverColor: '#474C50',
};

/**
 * @light theme
 */
export const lightTheme: Theme = {
  bgColor: '#FFFFFF',
  fontColor: '#000',
  rFontColor: '#fff',
  fontSubColor: '#B5B5B3',
  mainColor: '#F5B3D5',
  subColor: '#E1E1E1',
  hoverColor: '#efefef',
};

const ThemeMode: ThemeGroup = {
  darkTheme,
  lightTheme,
};

export default ThemeMode;
