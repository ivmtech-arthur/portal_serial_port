import Block from 'components/Common/Element/Block'
import React, { useRef, useEffect, useState, HTMLInputTypeAttribute, ReactNode } from 'react'
import {
    createTheme,
    ThemeProvider,
    styled as muiStyled,
} from '@mui/material/styles'
import { inherits } from 'util'
import { hexToRgbA } from 'lib/helper'
import { IconButton, InputAdornment, InputBasePropsColorOverrides, InputBasePropsSizeOverrides, OutlinedInput, SxProps, TextField, TextareaAutosize, Tooltip } from '@mui/material'
import { some } from 'lodash'
import { muiTheme } from 'styles/mui'
import StyledBody4 from 'components/Common/Element/body4'
import { Visibility } from '@mui/icons-material'
import BasicButton from 'components/Button/BasicButton'
import Button, { ButtonPropsColorOverrides, ButtonPropsSizeOverrides, ButtonPropsVariantOverrides } from '@mui/material/Button'
import { OverridableStringUnion } from '@mui/types'

type BasicTextFieldProps = {
    id?: string,
    type?: HTMLInputTypeAttribute,
    value?: string,
    textarea?: boolean,
    onClick?: (e) => void,
    color?: OverridableStringUnion<"primary" | "secondary" | "success" | "error" | "info" | "warning", InputBasePropsColorOverrides>
    rounded?: boolean,
    disabled?: boolean,
    variant?: OverridableStringUnion<"standard" | "filled" | "outlined", ButtonPropsVariantOverrides>,
    startIcon?: ReactNode,
    endIcon?: ReactNode,
    error?: boolean,
    size?: OverridableStringUnion<"small" | "medium", InputBasePropsSizeOverrides>,
    sx?: SxProps,
    placeholder: string,
    handleValidation: (e) => void,
    [name: string] : any
}

const BasicTextField = (props: BasicTextFieldProps) => {
    const { id, type, value, textarea, onClick, color, rounded, disabled, variant, startIcon, endIcon, hover, size, sx, placeholder, error, handleValidation, ...restProps } = props
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
    return (
        <ThemeProvider theme={muiTheme}>
            {
                textarea && <TextareaAutosize
                    style={{ resize: "vertical" }}
                    color={color}
                    className={`${rounded ? " rounded-full" : ""}`}
                    onClick={(e) => { onClickEvent(e) }}
                    placeholder={placeholder}
                />
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
                    className={`${rounded ? " rounded-full" : ""}`}
                    onClick={(e) => { onClickEvent(e) }}
                onChange={(e) => {
                        setCurrValue(e.target.value)
                        if (handleValidation)
                            handleValidation(e)
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