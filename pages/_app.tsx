import React, { useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { NextComponentType } from 'next';

import Appbar from '../src/components/Appbar';
import SocketProvider from '../src/context/Socket';

import theme from '../styles/theme';

interface AppProps {
  Component: NextComponentType;
  pageProps: any;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Stocks</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <SocketProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Appbar />
          <Container maxWidth="xl">
            <Box paddingY={3}>
              <Component {...pageProps} />
            </Box>
          </Container>
        </ThemeProvider>
      </SocketProvider>
    </>
  );
}
