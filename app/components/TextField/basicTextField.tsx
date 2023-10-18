import Block from 'components/Common/Element/Block'
import React, { useRef, useEffect, useState } from 'react'
import {
    createTheme,
    ThemeProvider,
    styled as muiStyled,
} from '@mui/material/styles'
import { inherits } from 'util'
import { hexToRgbA } from 'lib/helper'
import { IconButton, TextField, TextareaAutosize, Tooltip } from '@mui/material'
import { some } from 'lodash'
import { muiTheme } from 'styles/mui'

const BasicTextField = (props: any) => {
    const { type, onClick, color, rounded, disabled, variant, startIcon, endIcon, hover, size, sx, placeholder, ...restProps } = props
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
            {
                type == "textarea" && <TextareaAutosize
                    style={{resize: "vertical"}}
                color={color}
                className={`${rounded ? " rounded-full" : ""}`}
                onClick={(e) => { onClickEvent(e) }}
                placeholder={placeholder}
            />
            }
            {!type &&
                <TextField
                    {...restProps}
                    size={size}
                    sx={{ opacity: 1, zIndex: 999, ...(sx) }}
                    disabled={disabled}
                    variant={variant || 'outlined'}
                    color={color || "primary"}
                    className={`${rounded ? " rounded-full" : ""}`}
                    onClick={(e) => { onClickEvent(e) }}
                    placeholder={placeholder}>{props.children}</TextField>
            }
        </ThemeProvider>


    )
}

export default BasicTextField 