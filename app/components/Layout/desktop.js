import get from 'lodash/get'
import { withTheme } from 'styled-components'
import getConfig from 'next/config'
import styled from 'styled-components'
// import Loading from 'components/Loading'
import { useStore } from '/store'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
// import { withCookies } from 'react-cookie'
import Menu from 'components/Menu'
import ResponsiveDrawer from '../Menu/drawer'
// import { Block } from '@mui/icons-material'
import Block from 'components/Common/Element/Block'
import Footer from '../Footer'
import Popup from '../Popup'
const {
  publicRuntimeConfig: { SITE_URL },
} = getConfig()

const StyledLHSWrapper = styled(Block)`
  box-shadow: 2px 0px 10px 1px #aaaaaa;
`
const hideMenu = ['/login']

const DesktopLayout = (props) => {
  const {
    children,
  } = props
  const router = useRouter()
  const showMenu = hideMenu.every((route) => !router.asPath.includes(route))
  return (
    <Block display={showMenu ? "flex" : 'block'}>
      {/* <Block flex="0 0 200px" bg="purple1"> */}
      {showMenu && <ResponsiveDrawer />}
      {/* <StyledLHSWrapper
          width="100%"  
          height="100%"
          overflow="auto"
          maxHeight="100vh"
          position="sticky"
          top="0"
        >
          <Menu />
        </StyledLHSWrapper> */}
      {/* </Block> */}
      <Block flex="0 0 1" width="100%" maxWidth='100%' p="60px" marginX='20px' className='container'>
        {/* <Breadcrumb breadcrumbItems={breadcrumbItems} /> */}
        <Block>{children}</Block>
        {showMenu && <Footer/>}
        <Popup type="global"/>
      </Block>
    </Block>
  )
}

export default DesktopLayout