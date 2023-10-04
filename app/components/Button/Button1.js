
import Block from '/components/Common/Element/Block'
import React, { useRef, useEffect, useState } from 'react'
import {
    createTheme,
    ThemeProvider,
    styled as muiStyled,
} from '@mui/material/styles'
import Button from '@mui/material/Button'

const theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                // The default props to change
                disableRipple: true, // No more ripple, on the whole application 💣!
            },
            styleOverrides: {
                root: {
                    // backgroundColor: 'red',
                    borderRadius: '20px',
                    background: 'linear-gradient(53.34deg, #FF6F00 0%, #FFDEBF 100%)',
                    color: 'white',
                    "&:hover": {
                        background: '#FF6F00',
                        color: 'white',
                    },
                },
            },
        },
    },
})

const Button1 = (props) => {
    const { onClick, ...restProps } = props
    const onClickEvent = (e) => {
        if (props.onClick)
            props.onClick(e)
    }
    return (
        <Block {...restProps}>
            <ThemeProvider theme={theme}>
                <Button onClick={(e) => {onClickEvent(e)}} sx={{width: '140px'}}>{props.children}</Button>
            </ThemeProvider>
        </Block>

    )
}

export default Button1 