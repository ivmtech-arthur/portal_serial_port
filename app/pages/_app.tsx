import { AppProps } from "next/app";
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
// import JsxGlobalStyle from '/styles/global/styled-jsx'
import GlobalStyle from 'styles/global'
import '/styles/globals_style.scss'
import { StoreProvider, useStore } from 'store'
import Layout from 'components/Layout'
import React, { useEffect } from "react";
import { NextPageContext } from "next";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { getMenu } from "data/menu";
import axios from "axios";
import SuperJSON from "superjson";
import Decimal from "decimal.js";
import { setConfig, } from 'next/config'
import { globalS3Client } from "lib/aws";

interface InjectStates {
  user?: {
    authenticated: boolean;
    userProfile: any;
  };
  site?: {
    [name: string]: any
  }
}

SuperJSON.registerCustom<Decimal, string>(
  {
    isApplicable: (v): v is Decimal => Decimal.isDecimal(v),
    serialize: v => v.toJSON(),
    deserialize: v => new Decimal(v),
  },
  'decimal.js'
);

// SuperJSON.registerCustom<Date, string>(
//   {
//     isApplicable: (v): v is Date => v instanceof Date,
//     serialize: v => v.toJSON(),
//     deserialize: v => v.toString(),
//   },
//   'decimal.js'
// );



function App({ Component, pageProps, router }: AppProps<any>) {
  //notes: case when store refresh need inject state
  const config = dotenv.config();
  dotenvExpand.expand(config);
  const injectStates: InjectStates = {}

  if (pageProps?.user || pageProps?.profile) {
    injectStates.user = {
      authenticated: true,
      userProfile: pageProps?.user || pageProps?.profile,
    }
  }

  if (router.query.lang) {

    var pageName = "";
    let urlList = router.asPath.split('/');
    if (urlList.length > 1) {
      pageName = getMenu(router.query.lang).find((menu) => {
        // console.log("regex test", menu.regex?.test(urlList.slice(2).join('/')), menu.regex, urlList.slice(2).join('/'))
        if (menu.url === urlList.slice(2).join('/')) {
          return true
        } else if (menu.regex?.test(urlList.slice(2).join('/'))) {
          return true
        } else {
          return false
        }

      })?.title
    }
    injectStates.site = {
      lang: router.query.lang,
      pageName
    }
  }

  if (pageProps?.systemConstant) {
    injectStates.site.systemConstant = pageProps?.systemConstant
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
  console.log("getInitProps")
  // if (!globalS3Client.s3) { 
  //   await axios.post('/api/aws/init').then((res) => {
  //     console.log("res", res)
  //   }).catch((err) => {
  //     console.log("err", err)
  //   })
  // }

  return { props }

}

export default App