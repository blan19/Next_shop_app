import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
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
      <RecoilRoot>
        <GlobalStyles />
        <Component {...pageProps} />
      </RecoilRoot>
    </SWRConfig>
  );
}

export default MyApp;
