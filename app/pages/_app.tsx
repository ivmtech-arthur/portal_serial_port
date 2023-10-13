import { AppProps } from "next/app";
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
// import JsxGlobalStyle from '/styles/global/styled-jsx'
import GlobalStyle from 'styles/global'
import '/styles/globals_style.scss'
import { StoreProvider } from 'store'
import Layout from 'components/Layout'
import React from "react";
import { NextPageContext } from "next";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

interface InjectStates {
  user?: {
    authenticated: boolean;
    userProfile: any;
  };
}

function App({ Component, pageProps }: AppProps) {
  const config = dotenv.config();
  dotenvExpand.expand(config);
  const injectStates: InjectStates = {}
  if (pageProps) {
    injectStates.user = {
      authenticated: true,
      userProfile: pageProps,
    }
  }
  console.log(injectStates, 'injectStates')
  return (
    <>
      {/* <style jsx global>
        {JsxGlobalStyle}
      </style> */}
      <GlobalStyle />
      <StoreProvider injectStates={injectStates}>
        <ThemeProvider theme={theme}>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </StoreProvider>
    </>
  )
}


App.getInitialProps = async (ctx: NextPageContext) => {
  const props = ctx.query;
  const config = dotenv.config();
  dotenvExpand.expand(config);
  return { props }

}

export default App