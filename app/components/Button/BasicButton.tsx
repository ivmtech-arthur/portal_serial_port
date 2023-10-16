import Block from 'components/Common/Element/Block'
import React, { useRef, useEffect, useState } from 'react'
import {
    createTheme,
    ThemeProvider,
    styled as muiStyled,
} from '@mui/material/styles'
import Button from '@mui/material/Button'
import { inherits } from 'util'
import { hexToRgbA } from 'lib/helper'
import { IconButton } from '@mui/material'
import { some } from 'lodash'

const theme = createTheme({
    palette: {
        primary: {
            main: "#3B7DDD",
            dark: "#2264c3",
            contrastText: '#fff',
            light: '#5891E2',
        },
        secondary: {
            main: '#6F42C1',
            dark: "#5e37a6",
            light: '#855ECA'
        },
        success: {
            main: '#28A745',
            dark: "#218838",
            light: '#48B461',
        },
        error: {
            main: '#DC3545',
            dark: '#c82333',
            light: '#E15361',
        },
        warning: {
            main: '#FD7E14',
            dark: '#fd7e14',
            light: '#fd7e14',
        },
        info: {
            main: "#20C997",
            light: "#20C997",
            dark: "#20C997",
            
        }
    },
    components: {
        // MuiIconButton: {
        //     styleOverrides: {
        //         root: ({ ownerState, theme }) => {
        //             console.log("ownerState", ownerState, theme)
        //             theme.palette.primary.main
        //             return {
        //                 '&.Mui-disabled': {
        //                     opacity: "0.65",
        //                     // border: "inherit",
        //                     // backgroundColor: "inherit",
        //                     // ownerState.
        //                     ...(ownerState.variant == "contained" && {
        //                         // border: 
        //                         background: theme.palette[ownerState.color].main,
        //                         color: 'white',
        //                     }),
        //                     ...(ownerState.variant == "outlined" && {
        //                         border: `1px solid ${theme.palette[ownerState.color].main}`,
        //                         background: 'white',
        //                         color: theme.palette[ownerState.color].main,

        //                     })

        //                 },
        //                 '&:hover': {
        //                     ...(ownerState.variant == "contained" && {
        //                         // border: 
        //                         background: theme.palette[ownerState.color].dark,
        //                         color: 'white',
        //                     }),
        //                     ...(ownerState.variant == "outlined" && {
        //                         border: `1px solid ${theme.palette[ownerState.color].dark}`,
        //                         background: 'white',
        //                         color: theme.palette[ownerState.color].main,

        //                     })
        //                 },
        //                 '&:focus': {
        //                     boxShadow: `0 0 0 0.2rem ${hexToRgbA(theme.palette[ownerState.color].light, 0.5)}`
        //                 },
        //                 borderRadius: '3px',
        //                 lineHeight: '1.5',
        //                 letterSpacing: 'initial',
        //                 textTransform: 'none',
        //                 fontWeight: 400,
        //                 fontSize: '0.9375rem',
        //                 fontFamily: "inherit",
        //             }
        //         }
        //     }
        // },
        MuiButton: {
            defaultProps: {
                // The default props to change
                disableRipple: true, // No more ripple, on the whole application 💣!
            },
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    console.log("ownerState", ownerState, theme)
                    theme.palette.primary.main
                    return {
                        '&.Mui-disabled': {
                            opacity: "0.65",
                            // border: "inherit",
                            // backgroundColor: "inherit",
                            // ownerState.
                            ...(ownerState.variant == "contained" && {
                                // border: 
                                background: theme.palette[ownerState.color].main,
                                color: 'white',
                            }),
                            ...(ownerState.variant == "outlined" && {
                                border: `1px solid ${theme.palette[ownerState.color].main}`,
                                background: 'white',
                                color: theme.palette[ownerState.color].main,

                            })

                        },
                        '&:hover': {
                            ...(ownerState.variant == "contained" && {
                                // border: 
                                background: theme.palette[ownerState.color].dark,
                                color: 'white',
                            }),
                            ...(ownerState.variant == "outlined" && {
                                border: `1px solid ${theme.palette[ownerState.color].dark}`,
                                background: 'white',
                                color: theme.palette[ownerState.color].main,

                            })
                        },
                        '&:focus': {
                            boxShadow: `0 0 0 0.2rem ${hexToRgbA(theme.palette[ownerState.color].light, 0.5)}`
                        },
                        minWidth: 'unset',
                        borderRadius: '3px',
                        lineHeight: '1.5',
                        letterSpacing: 'initial',
                        textTransform: 'none',
                        fontWeight: 400,
                        fontSize: '0.9375rem',
                        fontFamily: "inherit",
                    }
                }
            },
        },
    },
})

const BasicButton = (props: any) => {
    const { onClick, rounded, disabled, variant, startIcon, endIcon, ...restProps } = props
    // console.log("children", props.children, Array.isArray(props.children),some((props.chilren), (child) => { return typeof child == 'string' }))
    let isIconButton = true;
    // if (props.children && typeof props.children === "string"
    //     || (Array.isArray(props.children) && some((props.children), (child) => {
    //         return typeof child === 'string'
    //     }))) { 
    //     isIconButton = false;
    // }
    const onClickEvent = (e) => {
        if (props.onClick)
            props.onClick(e)
    }
    return (
        <Block className="rounded- rounded-"{...restProps}>
            <ThemeProvider theme={theme}>
                <Button startIcon={startIcon} endIcon={endIcon} disabled={disabled} variant={variant || 'contained'} color="primary" className={`${rounded ? " rounded-full" : ""}`} onClick={(e) => { onClickEvent(e) }}>{props.children}</Button>
                {/* {isIconButton && <IconButton color='primary'>{props.children}</IconButton>}
                {!isIconButton && <Button startIcon={startIcon} endIcon={endIcon} disabled={disabled} variant={variant || 'contained'} color="primary" className={`${rounded ? " rounded-full" : ""}`} onClick={(e) => { onClickEvent(e) }}>{props.children}</Button>} */}
            </ThemeProvider>
        </Block>

    )
}

export default BasicButton 