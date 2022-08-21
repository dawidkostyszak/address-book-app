import type { AppProps } from 'next/app';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import GlobalStyle from 'components/globalstyles';
import Head from 'next/head';
import { NationalitiesContextProvider } from 'contexts/NationalitiesContext';

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
        <NationalitiesContextProvider>
          <Component {...pageProps} />
        </NationalitiesContextProvider>
      </ThemeProvider>
    </>
  );
}
