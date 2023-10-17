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
import { getMenu } from "data/menu";

interface InjectStates {
  user?: {
    authenticated: boolean;
    userProfile: any;
  };
  site?: {
    [name: string]: any
  }
}

function App({ Component, pageProps, router }: AppProps) {
  //notes: case when store refresh need inject state
  const config = dotenv.config();
  dotenvExpand.expand(config);
  const injectStates: InjectStates = {}
  if (pageProps) {
    injectStates.user = {
      authenticated: true,
      userProfile: pageProps,
    }
  }

  if (router.query.lang) { 
    
    var pageName = "";
    let urlList = router.asPath.split('/');
    if (urlList.length > 1) { 
      pageName = getMenu(router.query.lang).find((menu) => { return menu.url === urlList[urlList.length - 1]}).title
    }
    injectStates.site = {
      lang: router.query.lang,
      pageName
    }
  }
    
  // console.log(injectStates, 'injectStates', router.basePath)
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