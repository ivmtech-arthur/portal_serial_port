
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
                    border: '1px solid #FF6F00',
                    borderRadius: '20px',
                    // background: 'linear-gradient(53.34deg, #FF6F00 0%, #FFDEBF 100%)',
                    color: '#FF6F00',
                    fontFamily: 'Inter',
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '19px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    "&:hover": {
                        backgroundColor: '#FF6F00',
                        color: 'white',
                        // background: '#FF6F00',
                    },
                },
                outlined: true
            },
        },
    },
})

const Button2 = (props) => {
    const { onClick, ...restProps } = props
    const onClickEvent = (e) => {
        if (props.onClick)
            props.onClick(e)
    }
    return (
        <Block {...restProps}>
            <ThemeProvider theme={theme}>
                <Button onClick={(e) => { onClickEvent(e) }} sx={{width: '140px'}}>{props.children}</Button>
            </ThemeProvider>
        </Block>

    )
}

export default Button2