
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
                    backgroundColor: 'white',
                    textDecorationLine: 'underline',
                    // border: '1px solid #FF6F00',
                    borderRadius: '20px',
                    // background: 'linear-gradient(53.34deg, #FF6F00 0%, #FFDEBF 100%)',
                    color: '#7C7C7C',
                    fontFamily: 'Inter',
                    textTransform: 'initial',
                    "&:hover": {
                        color: '#333333',
                        backgroundColor: 'white',
                        textDecorationLine: 'underline',
                        // background: '#FF6F00',
                    },
                },
            },
        },
    },
})

const Button4 = (props) => {
    const { onClick, ...restProps } = props
    const onClickEvent = (e) => {
        if (props.onClick)
            props.onClick(e)
    }
    return (
        <Block {...restProps}>
            <ThemeProvider theme={theme}>
                <Button onClick={(e) => { onClickEvent(e) }} >{props.children}</Button>
            </ThemeProvider>
        </Block>

    )
}

export default Button4