
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
                    textDecorationLine: 'underline',
                    // border: '1px solid #FF6F00',
                    borderRadius: '20px',
                    // background: 'linear-gradient(53.34deg, #FF6F00 0%, #FFDEBF 100%)',
                    color: '#7C7C7C',
                    fontFamily: 'Inter',
                    "&:hover": {
                        color: '#333333',
                        backgroundColor: 'white',
                        textDecorationLine: 'underline',
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

const Button5 = (props) => {
    const { onClick, ...restProps } = props
    const [hoverEffect,setHoverEffect] = useState(false)
    const onClickEvent = (e) => {
        if (props.onClick)
            props.onClick(e)
    }
    return (
        <ThemeProvider theme={theme}>
            <Button startIcon={hoverEffect ? <SvgIconUnionBlack/> : <SvgIconUnionGrey/>} onMouseEnter={() => {setHoverEffect(true)}} onMouseLeave={() => {setHoverEffect(false)}}  onClick={(e) => {onClickEvent(e)}}>{props.children}</Button>
            {/* <Button>{props.children}</Button> */}
        </ThemeProvider>
    )
}

export default Button5