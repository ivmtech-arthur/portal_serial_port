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
import { IconButton, Tooltip } from '@mui/material'
import { some } from 'lodash'
import { muiTheme } from 'styles/mui'
    
const BasicButton = (props: any) => {
    const { onClick,color, rounded, disabled, variant, startIcon, endIcon,hover,tooltip,size,sx,className, ...restProps } = props
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
                    onClick={(e) => { onClickEvent(e) }}>{props.children}
                    
                </Button>
                {/* {isIconButton && <IconButton color='primary'>{props.children}</IconButton>}
                {!isIconButton && <Button startIcon={startIcon} endIcon={endIcon} disabled={disabled} variant={variant || 'contained'} color="primary" className={`${rounded ? " rounded-full" : ""}`} onClick={(e) => { onClickEvent(e) }}>{props.children}</Button>} */}
            </Tooltip>
        </ThemeProvider>
          
         
    )
}

export default BasicButton 