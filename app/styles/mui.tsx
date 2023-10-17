import {
    createTheme,
    ThemeProvider,
    styled as muiStyled,
} from '@mui/material/styles'
import React, { useRef, useEffect, useState } from 'react'
import { hexToRgbA } from 'lib/helper'

export const muiTheme = createTheme({

    typography: {
        fontFamily: [
            "Hind Vadodara", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"
        ].join(','),
    },
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
        MuiButtonGroup: {
            defaultProps: {
                // The default props to change
                // disableTouchRipple: true,
                // disableFocusRipple : true,
                disableRipple: true, // No more ripple, on the whole application 💣!
            },
        },
        MuiIconButton: {
            defaultProps: {
                // The default props to change
                // disableTouchRipple: true,
                // disableFocusRipple : true,
                disableRipple: true, // No more ripple, on the whole application 💣!
            },
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    if (ownerState.color) { 
                        ownerState.color = "primary"
                    }
                    // console.log("ownerState", ownerState, theme)
                    // theme.palette.primary.main
                    return {
                        ...(ownerState.variant == "text" ? {
                            color: 'white',
                        } : {}),
                        '&.Mui-disabled': {
                            opacity: "0.65",
                            ...(ownerState.variant == "contained" && {
                                // border: 
                                background: theme.palette[ownerState.color]?.main,
                                color: 'white',
                            }),
                            ...(ownerState.variant == "outlined" && {
                                border: `1px solid ${theme.palette[ownerState.color]?.main}`,
                                background: 'white',
                                color: theme.palette[ownerState.color]?.main,

                            })

                        },
                        '&:hover': {
                            // border: 
                            background: theme.palette[ownerState.color]?.dark,
                            color: 'white',
                            ...(ownerState.variant == "outlined" && {
                                border: `1px solid ${theme.palette[ownerState.color]?.dark}`,
                                background: 'white',
                                color: theme.palette[ownerState.color]?.main,

                            })
                        },
                        '&:focus': {
                            boxShadow: `0 0 0 0.2rem ${(theme.palette[ownerState.color]?.light ? hexToRgbA(theme.palette[ownerState.color]?.light, 0.5) : null)}`
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
            }
        },
        MuiButton: {
            defaultProps: {
                // The default props to change
                disableRipple: true, // No more ripple, on the whole application 💣!
            },
            styleOverrides: {
                root: ({ ownerState, theme }) => {

                    // console.log("ownerState", ownerState, theme)
                    // theme.palette.primary.main
                    return {
                        ...(ownerState.variant == "text" ? {
                            color: 'white',
                        } : {}),
                        '&.Mui-disabled': {
                            opacity: "0.65",
                            ...(ownerState.variant == "contained" && {
                                // border: 
                                background: theme.palette[ownerState.color]?.main,
                                color: 'white',
                            }),
                            ...(ownerState.variant == "outlined" && {
                                border: `1px solid ${theme.palette[ownerState.color]?.main}`,
                                background: 'white',
                                color: theme.palette[ownerState.color]?.main,

                            })

                        },
                        '&:hover': {
                            ...(ownerState.variant == "text" && {
                                background: theme.palette[ownerState.color]?.dark,
                                color: 'white',
                            }),
                            ...(ownerState.variant == "contained" && {
                                // border: 
                                background: theme.palette[ownerState.color]?.dark,
                                color: 'white',
                            }),
                            ...(ownerState.variant == "outlined" && {
                                border: `1px solid ${theme.palette[ownerState.color]?.dark}`,
                                background: 'white',
                                color: theme.palette[ownerState.color]?.main,

                            })
                        },
                        '&:focus': {
                            boxShadow: `0 0 0 0.2rem ${hexToRgbA(theme.palette[ownerState.color].light, 0.5)}`
                        },
                        padding: '8px',
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
        //table related
        MUIDataTableToolbar: {
            styleOverrides: {
                root: {
                    '& .MuiIconButton-root': {
                        borderRadius: '2px'

                    },
                },

                actions: ({ theme, ownerState }) => {
                    const localTheme: any = theme
                    return {
                        flex: "none",
                        borderRadius: "3px",
                        // width: "fit-content",
                        // '& .MuiIconButton-root': {
                        // border: '1px solid red',
                        background: localTheme.palette.primary.main
                        // },
                    }
                }, icon: ({ theme, ownerState }) => {
                    const localTheme: any = theme
                    return {
                        color: "white",
                        "&:hover": {
                            color: "white",
                            background: localTheme.palette.primary.dark
                        }
                    }
                }
            },
        },
        MUIDataTable: {
            styleOverrides: {
                root: {

                    padding: '1.25rem'
                },
            },
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    margin: 0,
                    borderRadius: 0,
                    fontFamily: 'Inter',
                    backgroundColor: 'white',
                    color: '#6c757d',
                    border: "1px solid #dee2e6",
                    "&:hover": {
                        translate: '0px -5px',
                        backgroundColor: '#dee2e6',
                        // color: '#dee2e6',
                    },
                    "&:img": {
                        display: 'none'
                    },
                    "&.Mui-selected": {
                        backgroundColor: '#3B7DDD',
                        textDecorationLine: 'underline',
                        color: 'white',
                        "&:hover": {
                            translate: '0px -5px',
                            backgroundColor: '#3B7DDD',
                            // color: '#3B7DDD',
                        },
                    }
                },
            }
        },
        MuiSelect: {
            styleOverrides: {
                // select: {
                //     ":focus": {
                //         border: "1px solid red"
                //     }
                // },
                outlined: {
                    padding: '0',
                    paddingLeft: '5px',

                },
                icon: {
                    // display: 'none'
                    color: 'white'
                }
            }
        },
        MuiPagination: {
            styleOverrides: {

            }
        }
        //table related
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 1181,
            lg: 1440,
            xl: 1920,
        },
    },
});