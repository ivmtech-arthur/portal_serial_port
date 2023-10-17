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
import SvgIconAddproduct from 'public/svg/icon_add_product.svg'
import SvgIconListproduct from 'public/svg/icon_list_product.svg'
import SvgIconLock from 'public/svg/icon_lock.svg'
import SvgIconLogout from 'public/svg/icon_logout.svg'
import SvgIconQuestion from 'public/svg/icon_question.svg'
import { menuContent } from 'data/menu'
import get from 'lodash/get'
import map from 'lodash/map';
import { useStore } from 'store'
import Block from 'components/Common/Element/Block'
import Hr from 'components/Common/Element/Hr'
import { makeStyles } from "@mui/styles";
import { useState } from 'react';
import Header from '../Header';
import { justifyContent } from 'styled-system';
import { useRouter } from 'next/router';
import { Collapse } from '@mui/material';
import * as Icon from "react-feather";
const drawerWidth = 280;

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 360
    },
    icon: {
        color: '#153d77',
        width: '15px',
        height: '15px',
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
    const [open, setOpen] = useState(false);
    const classes = useStyles()
    const sublist = item.list ? item.list.map((subItem) => {
        return (
            <Block className="block pt-1 pr-6 pb-1 pl-12 my-2 mx-0 text-[90%] cursor-pointer" onClick={() => router.push(`/${lang}/${subItem.url}`)}>{subItem.title}</Block>
        )
    }) : null
    return (
        <Block className=" w-full list-item" onClick={!item.list ? () => { router.push({ pathname: `/${lang}/${item.url}`, query: { pageName: item.title } }, `/${lang}/${item.url}`) } : () => { setOpen(!open) }}>
            <Block className=" flex items-center cursor-pointer hover block py-2 px-3 my-0 mx-2 bg-transparent rounded transition ease-in-out">
                <Block className=" w-[12.5%]">
                    {item.icon}
                </Block>
                <Block className="w-3/4  text-[#6c757d] hover:text-[#153d77] ">
                    {item.title}
                </Block>
                <Block className="w-[12.5%]">
                    {item.list && (!open ? <Icon.ChevronRight /> : <Icon.ChevronDown />)}
                </Block>

            </Block>
            {/* {sublist} */}
            <Collapse in={open} timeout="auto" unmountOnExit>
                {sublist}
            </Collapse>
        </Block>
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
        <Block
            className="flex flex-col items-end"
        >
            {buttons}
        </Block>
    );

    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        // <Block float="left" width="250px">
        
        <Block className="md:280px">
            <AppBar
            className="fixed md:w-[calc(100%-280px)] bg-[#203A45] shadow"
            sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
                backgroundColor: 'transparent',
                boxShadow: 'none'
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

                <IconButton
                    // sx={{}}
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, visibility: { md: 'hidden' },color:"white" }}
                >
                    <MenuIcon />
                </IconButton>
                <Header />
            </Toolbar>
        </AppBar>
            <Box
                sx={{ width: { md: drawerWidth }, }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    // anchor={'lef'}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'white', },
                    }}
                >
                    <Box
                        className="mx-auto my-5 md:block sm-hidden w-56 h-48"
                    >
                        <Block position='fixed' borderBottom="1px solid red" height='200px' width='220px' >
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
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'white', top: 'auto', boxShadow: '0 0 2rem 0 rgba(0, 0, 0, 0.05)' },
                    }}
                    open
                >
                    <Box
                        mx='auto'
                        my='20px'
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

        // </Block>
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
