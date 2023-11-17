import React, { ReactNode } from 'react'
import {
    ThemeProvider,
} from '@mui/material/styles'
import Button, { ButtonPropsColorOverrides, ButtonPropsSizeOverrides, ButtonPropsVariantOverrides } from '@mui/material/Button'
import { OverridableStringUnion } from '@mui/types'
import { SxProps, Tooltip } from '@mui/material'
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
    const onClickEvent = async (e) => {
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
                    onClick={async (e) => { await onClickEvent(e) }}
                >{props.children}

                </Button>
            </Tooltip>
        </ThemeProvider>


    )
}

export default BasicButton 