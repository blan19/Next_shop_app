import type { AppProps } from 'next/app';
import Theme, { GlobalStyles } from '@/utils/styles/Theme';
import useDarkMode from 'use-dark-mode';
import { ThemeProvider } from 'styled-components';

function MyApp({ Component, pageProps }: AppProps) {
  const darkMode = useDarkMode(false);
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={Theme[darkMode.value ? 'darkTheme' : 'lightTheme']}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
