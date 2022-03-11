import type { AppProps } from 'next/app';
import GlobalStyles from '@/utils/styles/GlobalStyles';
import { SWRConfig } from 'swr';
import fetchJson from '@/utils/lib/fetchJson';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (error) => {
          console.error(error);
        },
      }}
    >
      <GlobalStyles />
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
