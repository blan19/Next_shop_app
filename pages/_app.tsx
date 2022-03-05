import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import GlobalStyles from '@/utils/styles/GlobalStyles';
import { AuthProvider } from '@/hooks/useAuth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <RecoilRoot>
        <GlobalStyles />
        <Component {...pageProps} />
      </RecoilRoot>
    </AuthProvider>
  );
}

export default MyApp;
