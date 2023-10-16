import get from 'lodash/get'
import { withTheme } from 'styled-components'
import Header from 'components/Header'
// import VerticalMenu from 'components/VerticalMenu'
import Footer from 'components/Footer'
import getConfig from 'next/config'
// import Loading from 'components/Loading'
import { useStore } from '/store'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { withCookies } from 'react-cookie'
// import { Block } from '@mui/icons-material'
import Block from 'components/Common/Element/Block'
import DesktopLayout from './desktop'
import {
  createTheme,
  ThemeProvider,
  styled as muiStyled,
} from '@mui/material/styles'

const {
  publicRuntimeConfig: { SITE_URL },
} = getConfig()

const theme = createTheme({

  typography: {
    fontFamily: [
      "Hind Vadodara", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"
    ].join(','),
  },
  palette: {
    primary: {
      main: "#FFFFFF",
      light: '#FFFFFF',
      dark: '#FFFFFF',
      contrastText: '#fff',
    },
  },
  // components: {
  //   MuiButtonBase: {
  //     styleOverrides: {
  //       root: {
  //         fontFamily: "inherit",
  //         backgroundColor: "inherit"
  //       }
  //     }
  //   }
  // },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1181,
      lg: 1440,
      xl: 1920,
    },
  },
});


function Layout(props) {
  const {
    children,
    hideFooter,
    hideEmojiFooter,
    hideGenericFooter,
    hideLang = false,
    hideLogo = false,
    blankLayout = false,
    headerPosition = 'sticky',
    headerTheme = 'default',
    cookies,
  } = props
  const {
    state: {
      site: { loading, lang, storeHeaderTheme },
    },
    dispatch,
  } = useStore()
  const router = useRouter()
  const handleRouteChangeStart = () => {
    // dispatch({ type: 'setLoading', payload: { value: true } })
  }
  const [fireMenu, setFireMenu] = useState(false)
  const [headerButtonTheme, setHeaderButtonTheme] = useState('')
  const handleRouteChangeComplete = () => {
    const urlLang = get(window, 'location.href', '').match(/\/(zh|en)/)
    if (get(urlLang, '[1]') && lang !== get(urlLang, '[1]')) {
      dispatch({
        type: 'switchLang',
        payload: { lang: get(urlLang, '[1]'), cookies },
      })
    }
    // dispatch({ type: 'setLoading', payload: { value: false } })
  }

  // const idNeedUpdateFromScroll = [
  //   '#bg_marvel',
  //   '#bg_princess',
  //   '#bg_marvel_zone',
  // ]

  // const handleScroll = (e) => {
  //   let condList = idNeedUpdateFromScroll.map((item, index) => {
  //     return (
  //       document.querySelector(item) &&
  //       document.querySelector(item).getBoundingClientRect().y <= 0 &&
  //       -document.querySelector(item).getBoundingClientRect().y <=
  //         document.querySelector(item).getBoundingClientRect().height
  //     )
  //   })
  //   if (condList.some((value) => value)) {
  //     setHeaderButtonTheme('transparent')
  //   } else {
  //     setHeaderButtonTheme('')
  //   }
  // }

  const verticalMenu = (
    <Block
      display={{ md: 'block', _: 'none' }}
      position="sticky"
      top="20vh"
      zIndex="99"
    >
      {/* <VerticalMenu lang={lang} /> */}
    </Block>
  )

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    window.document.addEventListener('fireMenu', (e) => {
      setFireMenu(true)
    })
    // window.addEventListener('scroll', handleScroll)
  }, []) // eslint-disable-line

  return (
    <>
      <DesktopLayout>
        {/* {!blankLayout && (
          <Header
            hideLang={hideLang}
            hideLogo={hideLogo}
            headerButtonTheme={headerButtonTheme}
            headerPosition={headerPosition}
            headerTheme={storeHeaderTheme || headerTheme}
          />
        )} */}

        {/* {verticalMenu} */}
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
     

        {/* {!hideFooter && !blankLayout && (
          <Footer
            hideEmojiFooter={hideEmojiFooter}
            hideGenericFooter={hideGenericFooter}
          />
        )} */}
        {/* {loading && <Loading />} */}
      </DesktopLayout>

    </>
  )
}

export default withCookies(withTheme(Layout))
