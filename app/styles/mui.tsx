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
        // MuiFilledInput: {
        //     styleOverrides: {
        //         root: {
        //             backgroundColor: "green",
        //             "&.Mui-focused": {
        //                 backgroundColor: "yellow",
        //             }
        //         },
        //     }
        // },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {

                    return {
                        ...(ownerState.color == "error" && {
                            border: `1px solid ${theme.palette[ownerState.color]?.dark}`,
                        }),
                        borderColor: '#FFFFFF',
                        '&:hover fieldset': {
                            // background: '#000000',
                            border: '1px solid red'
                        },
                        padding: '3px',
                        // border: '1px solid red'
                    }
                    // input: ({ ownerState, theme }) => { 
                    //     // ownerState.size = ""
                    //     // let padding = '16.5px,14px';
                    //     // return {
                    //     //     padding: '5px',
                    //     // }
                    // }
                }
            }
        },
        // MuiInput: {
        //     styleOverrides: {
        //         root: ({ ownerState, theme }) => {
        //             return {
        //                 '&:hover': {
        //                     // background: '#000000',
        //                     border: '1px solid yellow'
        //                 },
        //                 border: '1px solid green',
        //                 ...(ownerState.color == "error" && {
        //                     border: `1px solid ${theme.palette[ownerState.color]?.dark}`,
        //                 }),
        //                 // border: '1px solid #FFFFFF',
        //                 // backgroundColor: "green",
        //                 "&.Mui-focused": {
        //                     boxShadow: `0 0 0 0.2rem ${hexToRgbA(theme.palette[ownerState.color].light, 0.5)}`
        //                 }
        //             }

        //         },
        //     }
        // },
        MuiInputBase: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {

                    return {
                        // border: '1px solid green',
                        // ...(ownerState.color == "error" && {
                        // border: `5px solid ${hexToRgbA(theme.palette[ownerState.color]?.dark)}`,
                        // }),
                        // '&:hover': {
                        //     // background: '#000000',
                        //     border: '1px solid yellow'
                        // },
                        // border: '1px solid #FFFFFF',
                        // backgroundColor: "green",
                        // '& .MuiSelect-outlined': {

                        //     border: '10px solid red',
                        //     // borderColor: theme.palette[ownerState.color]?.main,
                        // },

                        "&.Mui-focused": {
                            // '&.MuiInputBase-input': {
                            //     // '&.MuiInputBase-formControl': {
                            //         border: '3px solid red',
                            //         borderColor: theme.palette[ownerState.color].main,
                            //     // },
                            // },


                            boxShadow: `0 0 0 0.2rem ${hexToRgbA(theme.palette[ownerState.color].light, 0.5)}`
                        }
                    }

                },
                
                // formControl: ({ ownerState, theme }) => {
                //     return {
                //         "&.Mui-focused": {
                //             border: '3px solid red',
                //             borderColor: theme.palette[ownerState.color].main,
                //         }
                        
                //     }
                // }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    return {
                        '&:hover': {
                            ...(ownerState.variant == "filled" && {
                                background: theme.palette[ownerState.color]?.dark,
                                color: 'white',
                            }),
                            ...(ownerState.variant == "standard" && {
                                // border: 
                                background: theme.palette[ownerState.color]?.dark,
                                color: 'white',
                            }),
                            ...(ownerState.variant == "outlined" && {
                                // border: `1px solid ${theme.palette[ownerState.color]?.dark}`,
                                background: 'white',
                                color: theme.palette[ownerState.color]?.main,

                            })
                        },
                        // '&.Mui-focused': {
                        //     boxShadow: `0 0 0 2rem ${hexToRgbA(theme.palette[ownerState.color].light, 0.5)}`
                        // },
                    }
                },

            }
        },
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
                    ownerState.itemProp
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
                                background: 'transparent',
                                // background: theme.palette[ownerState.color]?.dark,
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
        MuiCheckbox: {
            defaultProps: {
                // disableRipple: true
            },
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    return {
                        borderRadius: 0,
                        padding: 0,
                        appearance: 'auto',
                        '& svg': {

                            borderRadius: '2px',
                            padding: '0px',
                            margin: 0,
                            color: '#dee2e6',
                        },
                        '&.Mui-checked': {
                            "&.Mui-focusVisible": {
                                color: "red",
                                '& > svg': {
                                    boxShadow: `0 0 0 0.2rem ${hexToRgbA(theme.palette[ownerState.color].light, 0.5)}`
                                }
                            },
                            '& > svg': {
                                color: theme.palette[ownerState.color]?.main,
                            }
                        },
                        "&.Mui-focusVisible": {
                            '& > svg': {
                                boxShadow: `0 0 0 0.2rem ${hexToRgbA(theme.palette[ownerState.color].light, 0.5)}`
                            }

                        },
                        //notes checkbox no focus props: https://stackoverflow.com/questions/59374131/material-ui-global-checkbox-focus-styling-not-locally
                        "&.focused": {
                            '& > svg': {
                                boxShadow: `0 0 0 0.2rem ${hexToRgbA(theme.palette[ownerState.color].light, 0.5)}`
                            }
                        },
                        "&.focused:not(.Mui-focusVisible):not(.Mui-checked)": {
                            '& > svg': {
                                boxShadow: `0 0 0 0.2rem ${hexToRgbA(theme.palette[ownerState.color].light, 0.5)}`
                            }
                        }
                    }
                }

            }
        },
        MuiRadio: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    return {
                        '& svg': {

                            borderRadius: '2px',
                            padding: '0px',
                            margin: 0,
                            color: '#dee2e6',
                        },
                        '&.Mui-checked': {
                            "&.Mui-focusVisible": {
                                color: "red",
                                '& > svg': {
                                    boxShadow: `0 0 0 0.2rem ${hexToRgbA(theme.palette[ownerState.color].light, 0.5)}`
                                }
                            },
                            '& > svg': {
                                color: theme.palette[ownerState.color]?.main,
                            }
                        },
                        "&.Mui-focusVisible": {
                            border: '1px solid red',
                            '& > svg': {
                                boxShadow: `0 0 0 0.2rem ${hexToRgbA(theme.palette[ownerState.color].light, 0.5)}`
                            }

                        },
                        //notes checkbox no focus props: https://stackoverflow.com/questions/59374131/material-ui-global-checkbox-focus-styling-not-locally
                        "&.focused": {
                            '& > svg': {
                                boxShadow: `0 0 0 0.2rem ${hexToRgbA(theme.palette[ownerState.color].light, 0.5)}`
                            }
                        },
                        "&.focused:not(.Mui-focusVisible):not(.Mui-checked)": {
                            '& > svg': {
                                boxShadow: `0 0 0 0.2rem ${hexToRgbA(theme.palette[ownerState.color].light, 0.5)}`
                            }
                        }
                    }
                }
            }
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
                // root: ({ theme, ownerState }) => {
                //     return {
                //         '& .MuiInputBase-input': {
                //             border: '10px solid red',
                //             // borderColor: theme.palette[ownerState.color]?.main,
                //         }

                //     }
                // },
                // outlined: {
                //     // padding: '0',
                //     // paddingLeft: '5px',
                //     border: '10px solid red',
                // },
                icon: ({ theme, ownerState }) => {
                    return {
                        // display: 'none'
                        color: ownerState?.variant == "filled" ? 'white' : 'black'
                    }
                },
                // select: ({ theme, ownerState }) => { 
                //     return {
                //         border: '10px solid red',
                //         '& .MuiInputBase-input': {
                //             border: '10px solid red',
                //             // borderColor: theme.palette[ownerState.color]?.main,
                //         }

                //     }
                // }
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