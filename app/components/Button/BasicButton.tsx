import Block from 'components/Common/Element/Block'
import React, { useRef, useEffect, useState, ReactNode } from 'react'
import {
    createTheme,
    ThemeProvider,
    styled as muiStyled,
} from '@mui/material/styles'
import Button, { ButtonPropsColorOverrides, ButtonPropsSizeOverrides, ButtonPropsVariantOverrides } from '@mui/material/Button'
import { OverridableStringUnion } from '@mui/types'
import { inherits } from 'util'
import { hexToRgbA } from 'lib/helper'
import { Color, IconButton, SxProps, Tooltip } from '@mui/material'
import { some } from 'lodash'
import { muiTheme } from 'styles/mui'

type BasicButtonProps = {
    onClick?: (e) => void,
    color?: OverridableStringUnion<"inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning", ButtonPropsColorOverrides>,
    rounded?: boolean,
    disabled?: boolean,
    variant?: OverridableStringUnion<"text" | "contained" | "outlined", ButtonPropsVariantOverrides>,
    startIcon?: ReactNode,
    endIcon?: ReactNode,
    tooltip?: String,
    size?: OverridableStringUnion<"small" | "medium" | "large", ButtonPropsSizeOverrides>,
    sx?: SxProps,
    className?: String,
    [name: string]: any
}

const BasicButton = (props: BasicButtonProps) => {
    const { onClick, color, rounded, disabled, variant, startIcon, endIcon, tooltip, size, sx, className, ...restProps } = props
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
        <ThemeProvider theme={muiTheme}>
            <Tooltip title={tooltip}>
                <Button
                    {...restProps}
                    size={size}
                    sx={{ opacity: 1, zIndex: 999, ...(sx) }}
                    startIcon={startIcon}
                    endIcon={endIcon}
                    disabled={disabled}
                    variant={variant || 'contained'}
                    color={color || "primary"}
                    className={`${rounded ? " rounded-full" : ""} ${className}`}
                    onClick={(e) => { onClickEvent(e) }}
                >{props.children}

                </Button>
                {/* {isIconButton && <IconButton color='primary'>{props.children}</IconButton>}
                {!isIconButton && <Button startIcon={startIcon} endIcon={endIcon} disabled={disabled} variant={variant || 'contained'} color="primary" className={`${rounded ? " rounded-full" : ""}`} onClick={(e) => { onClickEvent(e) }}>{props.children}</Button>} */}
            </Tooltip>
        </ThemeProvider>


    )
}

export default BasicButton 