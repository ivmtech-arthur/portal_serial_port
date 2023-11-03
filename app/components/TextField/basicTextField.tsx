import Block from 'components/Common/Element/Block'
import React, { useRef, useEffect, useState, HTMLInputTypeAttribute, ReactNode, useCallback } from 'react'
import {
    createTheme,
    ThemeProvider,
    styled as muiStyled,
} from '@mui/material/styles'
import { inherits } from 'util'
import { hexToRgbA } from 'lib/helper'
import { IconButton, InputAdornment, InputBaseComponentProps, InputBasePropsColorOverrides, InputBasePropsSizeOverrides, OutlinedInput, SxProps, TextField, TextareaAutosize, Tooltip } from '@mui/material'
import { some } from 'lodash'
import { muiTheme } from 'styles/mui'
import StyledBody4 from 'components/Common/Element/body4'
import { Visibility } from '@mui/icons-material'
import BasicButton from 'components/Button/BasicButton'
import Button, { ButtonPropsColorOverrides, ButtonPropsSizeOverrides, ButtonPropsVariantOverrides } from '@mui/material/Button'
import { OverridableStringUnion } from '@mui/types'
import styled from 'styled-components'

type BasicTextFieldProps = {
    id?: string,
    type?: HTMLInputTypeAttribute,
    value?: string,
    textarea?: boolean,
    onClick?: (e) => void,
    onChange?: (e) => void,
    color?: OverridableStringUnion<"primary" | "secondary" | "success" | "error" | "info" | "warning", InputBasePropsColorOverrides>
    rounded?: boolean,
    disabled?: boolean,
    variant?: OverridableStringUnion<"standard" | "filled" | "outlined", ButtonPropsVariantOverrides>,
    startIcon?: ReactNode,
    endIcon?: ReactNode,
    error?: any,
    size?: OverridableStringUnion<"small" | "medium", InputBasePropsSizeOverrides>,
    sx?: SxProps,
    placeholder?: string,
    inputProps?: InputBaseComponentProps,
    handleValidation?: (e, type: string) => void,
    [name: string]: any
}

const CustomTextArea = styled(TextareaAutosize)(({ theme, color, value }) => ({
    ":focus": {
        boxShadow: `0 0 0 0.2rem ${hexToRgbA(theme.palette[color].light, 0.5)}`,
        border: `2px solid ${hexToRgbA(theme.palette[color].main, 1)}`
    },
    '::placeholder': {
        color: '#C4C4C4',
        opacity: 1, /* Firefox */
    },
    ...(value ? {} : {


    })
}))



const BasicTextField = (props: BasicTextFieldProps) => {
    const { id, type, value, textarea, onClick, color, rounded, disabled, variant, startIcon, endIcon, hover, size, sx, placeholder, error, handleValidation, onChange, className, inputProps, uppercase, ...restProps } = props
    // console.log("children", props.children, Array.isArray(props.children),some((props.chilren), (child) => { return typeof child == 'string' }))
    let isIconButton = true;
    // if (props.children && typeof props.children === "string"
    //     || (Array.isArray(props.children) && some((props.children), (child) => {
    //         return typeof child === 'string'
    //     }))) { 
    //     isIconButton = false;
    // }
    const [currValue, setCurrValue] = useState(value)
    const onClickEvent = (e) => {
        if (props.onClick)
            props.onClick(e)
    }

    const handleOnChange = (e) => {
        if (uppercase) {
            setCurrValue(e.target.value.toUpperCase())
        } else {
            setCurrValue(e.target.value)
        }

        if (handleValidation)
            handleValidation(e, type == "number" ? "number" : "string")
        if (onChange)
            onChange(e)
    }
    return (
        <ThemeProvider theme={muiTheme}>
            {
                textarea &&
                <Block className={` ${className}`}>
                    <CustomTextArea
                        {...restProps}
                        theme={muiTheme}
                        value={currValue}
                        id={id}
                        onChange={(e) => {
                            handleOnChange(e)
                        }}
                        color={!error ? (color || "primary") : "error"}
                        className={`${rounded ? " rounded-full" : "rounded-[3px]"} hover:border-[#333333] resize-y min-h-[19px] py-[9.5px] px-[14px] border-[#C4C4C4]`}
                        onClick={(e) => { onClickEvent(e) }}
                        placeholder={placeholder}
                    />

                </Block>
            }
            {!textarea &&
                <TextField
                    {...restProps}
                    id={id}
                    type={type}
                    value={currValue}
                    error={error}
                    size={size || 'small'}
                    sx={{ opacity: 1, zIndex: 999, width: "100%", ...(sx) }}
                    disabled={disabled}
                    variant={variant || 'outlined'}
                    color={!error ? (color || "primary") : "error"}
                    className={`${rounded ? " rounded-full" : ""} ${className}`}
                    onClick={(e) => { onClickEvent(e) }}
                    InputProps={{
                        inputProps: inputProps
                    }}
                    onChange={(e) => {
                        handleOnChange(e)
                    }}
                    {...(type == "password" && {
                        InputProps: {
                            endAdornment: (
                                <InputAdornment position="start">
                                    <BasicButton variant="text"
                                        onClick={() => {
                                            var x: any = document.getElementById(props.id)
                                            if (x.type === "password") {
                                                x.type = "text";
                                            } else {
                                                x.type = "password";
                                            }
                                        }}
                                        sx={{
                                            color: 'black',
                                            "&:hover": {
                                                color: 'black',
                                            },
                                            "&:focus": {
                                                boxShadow: 'none'
                                            }
                                        }}><Visibility /></BasicButton>
                                </InputAdornment>
                            ),
                        }
                    })}
                    placeholder={placeholder}>{props.children}

                </TextField>
            }
            {error && <Block display='flex'><i aria-hidden="true" className='error-icon' /><StyledBody4 color='errorRed'>{error}</StyledBody4></Block>}
        </ThemeProvider>


    )
}

export default BasicTextField 