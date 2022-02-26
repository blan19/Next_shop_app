import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    fontColor: string;
    mainColor: string;
    subColor: string;
    bgColor: string;
    hoverColor: string;
    rFontColor: string;
    fontSubColor: string;
  }
}
