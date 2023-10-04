import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';
import SvgIconAddproduct from '/public/svg/icon_add_product.svg'
import SvgIconListproduct from '/public/svg/icon_list_product.svg'
import SvgIconLock from '/public/svg/icon_lock.svg'
import SvgIconLogout from '/public/svg/icon_logout.svg'
import SvgIconQuestion from '/public/svg/icon_question.svg'
import menuContent from '../../data/menu'
import get from 'lodash/get'
import map from 'lodash/map';
import { useStore } from '/store'
import Block from '/components/Common/Element/Block'
import Hr from '/components/Common/Element/Hr'
import { makeStyles } from "@mui/styles";
import { useState } from 'react';
import Header from '../Header';
import { justifyContent } from 'styled-system';
import { useRouter } from 'next/router';
const drawerWidth = 270;

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 360
    },
    icon: {
        color: 'red',
        //   border: '1px solid green'
    }
});

const MenuItem = (props) => {
    const { item, index } = props
    const {
        state: {
            site: { loading, lang, storeHeaderTheme },
        },
        dispatch,
    } = useStore()
    const router = useRouter()
    const [hover, setHover] = useState(false)
    const classes = useStyles()
    return (
        <Block width='85%' >
            <ListItem key={index} disablePadding onMouseEnter={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }}>
                <ListItemButton
                    onClick={() => {
                        if (item.key == 'logout')
                            dispatch({
                                type: 'showPopup',
                                payload: {
                                    popup: true,
                                    popupType: 'logout',
                                    isGlobal: true,
                                },
                            });
                        else
                            router.push(`/${lang}${item.url}`)
                    }}
                    sx={{
                        borderRadius: '20px 0px 0px 20px', color: 'white', height: '70px', '&:hover': {
                            backgroundColor: 'white',
                            color: '#570680',
                        },
                        display: 'flex',
                        justifyContent: 'end'
                    }}>
                    <ListItemIcon className={classes.icon}>
                        {hover ? item.svg : item.svgWhite}
                        {/* <SvgIcon component={item.svg}/> */}
                    </ListItemIcon>
                    <ListItemText sx={{ maxWidth: '130px' }} primary={item.title} />
                </ListItemButton>
            </ListItem>
        </Block >
    )
}

function ResponsiveDrawer(props) {
    const {
        state: {
            site: { loading, lang, storeHeaderTheme },
        },
        dispatch,
    } = useStore()
    const router = useRouter()
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    // console.log("drawer", menuContent, lang)
    const menu = get(menuContent, lang)

  
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };



    const buttons = map(menu, (item, index) => {

        return (<MenuItem item={item} index={index} />)
    })
    const drawer = (
        <Block display='flex' flexDirection='column' alignItems="end">
            {buttons}
        </Block>
    );

    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <Block display='flex' bg='purple2'>
            <AppBar

                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton
                        color="primary"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, visibility: { md: 'hidden' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Header />
                </Toolbar>
            </AppBar>

            <Box
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >


                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#570680', },
                    }}
                >
                    <Box
                        mx='auto'
                        my='20px'
                        // display={{ xs: 'none', md: 'block' }}
                        width='220px' height='200px'
                    >
                        <Block position='fixed' borderBottom="1px solid white" height='200px' width='220px' >
                            <Block
                                mx='auto'
                                backgroundImage="url(/image/logo.jpg)" backgroundPosition='100% 100%' width='160px' height='160px'></Block>
                        </Block>

                    </Box>
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{

                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#570680', top: 'auto' },
                    }}
                    open
                >
                    <Box
                        mx='auto'
                        my='20px'
                        // display={{ xs: 'none', md: 'block' }}
                        width='220px' height='200px'
                    >
                        <Block position='fixed' borderBottom="1px solid white" height='200px' width='220px' >
                            <Block
                                mx='auto'
                                backgroundImage="url(/image/logo.jpg)" backgroundPosition='100% 100%' width='160px' height='160px'></Block>
                        </Block>

                    </Box>
                    {drawer}
                </Drawer>
            </Box>
        </Block>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
