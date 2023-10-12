import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import JsxGlobalStyle from 'styles/global/styled-jsx'
import GlobalStyle from 'styles/global'
import { StoreProvider } from 'store'
import Layout from 'components/Layout'
import { CookiesProvider } from 'react-cookie';

interface InjectStates {
  user?: {
    authenticated: boolean;
    userProfile: any;
  };
  site?: {
    lang: any
  }
}

function App(ctx) {
  const { Component, pageProps } = ctx
  // console.log("pageProps", ctx.router)
  const injectStates: InjectStates = {}
  if (pageProps?.profile) {
    injectStates.user = {
      authenticated: true,
      userProfile: pageProps.profile,
    }


  }
  if (ctx.router.query.lang)
    injectStates.site = {
      lang: ctx.router.query.lang
    }
  return (
    <>
      <style jsx global>
        {JsxGlobalStyle}
      </style>
      <GlobalStyle />
      <StoreProvider injectStates={injectStates}>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            <Layout {...pageProps}>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </CookiesProvider>
      
      </StoreProvider>
    </>
  )
}

export default App
