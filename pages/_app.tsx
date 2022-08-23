import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';

import GlobalStyle from 'components/globalstyles';
import { NationalitiesContextProvider } from 'contexts/NationalitiesContext';
import { theme } from 'utils/theme';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Address book app</title>
        <meta name="description" content="Created by Dawid Kostyszak" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          <NationalitiesContextProvider>
            <Component {...pageProps} />
          </NationalitiesContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
