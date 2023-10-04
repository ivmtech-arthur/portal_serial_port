
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
                    backgroundColor: '#F4F4F4',
                    // border: '1px solid #FF6F00',
                    borderRadius: '20px',
                    // background: 'linear-gradient(53.34deg, #FF6F00 0%, #FFDEBF 100%)',
                    color: '#525252',
                    fontFamily: 'Inter',
                    "&:hover": {
                        backgroundColor: '#BF94E4',
                        color: 'white',
                        // background: '#FF6F00',
                    },
                },
            },
        },
    },
})

const Button3 = (props) => {
    const { onClick, ...restProps } = props
    const onClickEvent = (e) => {
        if (props.onClick)
            props.onClick(e)
    }
    return (
        <ThemeProvider theme={theme}>
            <Button  onClick={(e) => {onClickEvent(e)}} sx={{width: '101px'}}>{props.children}</Button>
        </ThemeProvider>
    )
}

export default Button3