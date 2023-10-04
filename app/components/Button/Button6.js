
import React, { useRef, useEffect, useState } from 'react'
import {
    createTheme,
    ThemeProvider,
    styled as muiStyled,
} from '@mui/material/styles'
import Button from '@mui/material/Button'
import SvgIcon from '@mui/material/SvgIcon'
import SvgIconUnionGrey from '/public/svg/icon_union_grey.svg'
import SvgIconUnionBlack from '/public/svg/icon_union_black.svg'
import { IconButton } from '@mui/material'
import StyledBody2 from '../Common/Element/body2'
const theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                // The default props to change
                disableRipple: true, // No more ripple, on the whole application 💣!
            },
            styleOverrides: {
                root: {
                    backgroundColor: 'white',
                    border: '1px solid #570680',
                    borderRadius: '20px',
                    // background: 'linear-gradient(53.34deg, #FF6F00 0%, #FFDEBF 100%)',
                    color: '#570680',
                    fontFamily: 'Inter',
                    "&:hover": {
                        backgroundColor: 'rgba(178, 149, 193, 0.16)',
                        color: '#570680',
                        // background: '#FF6F00',
                    },
                },
                startIcon: {
                    "&:hover": {}
                }

            },
        },
        MuiIconButton: {
            defaultProps: {
                // The default props to change
                disableRipple: true, // No more ripple, on the whole application 💣!
            },
            styleOverrides: {
                root: {
                    backgroundColor: 'white',
                    border: '1px solid #570680',
                    borderRadius: '20px',
                    // background: 'linear-gradient(53.34deg, #FF6F00 0%, #FFDEBF 100%)',
                    color: '#570680',
                    fontFamily: 'Inter',
                    "&:hover": {
                        backgroundColor: '#570680',
                        color: '#570680',
                        // background: '#FF6F00',
                    },
                },
                startIcon: {
                    "&:hover": {}
                }

            },
        },
    },
})

const Button6 = (props) => {
    const { onClick, ...restProps } = props
    const [hoverEffect, setHoverEffect] = useState(false)
    const [active, setActive] = useState(props.active)
    const activeEffect = { backgroundColor: '#570680', color: 'white' }
    const activeEffect2 = { backgroundColor: '#570680' }
    let style = {
        width: '100%',
        display: {
            xs: 'none',
            sm: 'flex',
        }
    }

    let style2 = {
        display: {
            sm: 'none',
            xs: 'flex',
        },
    }
    let value = props.children
    if (props.active){
        style = { ...style, ...activeEffect }
        style2 = { ...style2, ...activeEffect2 }
    }
        

    useEffect(() => {
        style = {
            width: '100%',
        }
    }, [props.active])
    const onClickEvent = (e) => {
        setActive(!active)
        if (props.onClick)
            props.onClick(e)
    }
    return (
        <ThemeProvider theme={theme}>
            <Button startIcon={<SvgIconUnionBlack />} onMouseEnter={() => { setHoverEffect(true) }} onMouseLeave={() => { setHoverEffect(false) }} onClick={(e) => { onClickEvent(e) }} sx={style}>{value}</Button>
            <IconButton  onMouseEnter={() => { setHoverEffect(true) }} onMouseLeave={() => { setHoverEffect(false) }} onClick={(e) => { onClickEvent(e) }} sx={style2}>
                {active ? <SvgIconUnionBlack/> : <SvgIconUnionGrey/> }

            </IconButton>
            {/* <Button>{props.children}</Button> */}
        </ThemeProvider>
    )
}

export default Button6