import { ThemeProvider } from 'styled-components'
import theme from '/styles/theme'
import JsxGlobalStyle from '/styles/global/styled-jsx'
import GlobalStyle from '/styles/global'
import { StoreProvider } from '/store'
import Layout from '/components/Layout'

function App({ Component, pageProps }) {
  const injectStates = {}
  if (pageProps?.profile) {
    injectStates.user = {
      authenticated: true,
      userProfile: pageProps.profile,
    }
  }
  console.log(injectStates, 'injectStates')
  return (
    <>
      <style jsx global>
        {JsxGlobalStyle}
      </style>
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

export default App
