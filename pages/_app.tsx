import type { AppProps } from 'next/app';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';

import GlobalStyle from 'components/globalstyles';
import { NationalitiesContextProvider } from 'contexts/NationalitiesContext';

const queryClient = new QueryClient();

const theme: DefaultTheme = {
  colors: {
    primary: '#111',
    secondary: '#0070f3',
  },
};

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
