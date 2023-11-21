import get from 'lodash/get'
import { withTheme } from 'styled-components'
import getConfig from 'next/config'
import styled from 'styled-components'
// import Loading from 'components/Loading'
import { useStore } from 'store'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
// import { withCookies } from 'react-cookie'
import Menu from 'components/Menu'
import MenuIcon from '@mui/icons-material/Menu';
import ResponsiveDrawer from '../Menu/drawer'
// import { Block } from '@mui/icons-material'
import Block from 'components/Common/Element/Block'
import Footer from '../Footer'
import Popup from '../Popup'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import Header from '../Header';
const {
  publicRuntimeConfig: { SITE_URL },
} = getConfig()

const StyledMainWrapper = styled.div`
/* background-color: #000000; */
  &:before {
    position: absolute;
    content: " ";
    box-sizing: border-box;
    width: 100%;
    height: 264px;
    top: 0;
    left: 0;
    background-color: #203A45;
/* z-index: 1; */
  }
`

const StyledLHSWrapper = styled(Block)`
  box-shadow: 2px 0px 10px 1px #aaaaaa;
`
const hideMenu = ['/login']
const drawerWidth = 280;
const DesktopLayout = (props) => {
  const {
    children,
  } = props
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const showMenu = hideMenu.every((route) => !router.asPath.includes(route))
  return (
    <StyledMainWrapper >

      {/* <Block flex="0 0 200px" bg="purple1"> */}
      <Block className="flex w-full">
        {showMenu && <ResponsiveDrawer mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} handleDrawerToggle={handleDrawerToggle} />}

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
        <Block className={`container ${showMenu ? 'md:w-[calc(100%-280px)]' : 'md:w-[calc(100%-280px)]'} max-w-full mt-20 mx-5 z-[6] relative`}>
          <AppBar
            className="bg-[#203A45] shadow  md:w-[calc(100%-280px)]"
            sx={{
              zIndex: 1200,
              // width: { md: `calc(100% - ${drawerWidth}px)` },
              // ml: { md: `${drawerWidth}px` },
              backgroundColor: 'transparent',
              boxShadow: 'none'
            }}
          >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, visibility: { md: 'hidden' }, color: "white" }}
              >
                <MenuIcon />
              </IconButton>
              <Header />
            </Toolbar>
          </AppBar>
          {/* <Block className="h-[100px] z-[10] absolute">
            test
</Block> */}
          {/* <Breadcrumb breadcrumbItems={breadcrumbItems} /> */}
          <Block className="pb-6 z-[1]">{children}</Block>
          {showMenu && <Footer />}
          <Popup type="global" />
        </Block>
      </Block>

    </StyledMainWrapper>
  )
}

export default DesktopLayout