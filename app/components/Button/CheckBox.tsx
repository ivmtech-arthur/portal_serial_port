
import Block from 'components/Common/Element/Block'
import React, { useRef, useEffect, useState } from 'react'
import {
    createTheme,
    ThemeProvider,
    styled as muiStyled,
} from '@mui/material/styles'
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const theme = createTheme({
    components: {
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    // color: "red"
                    fontFamily: 'Inter',
                    "&.Mui-checked": {
                        color: "purple"
                    }
                },
                // checked: {
                //     color: "purple"
                // }
            }
        },

    },
})

const CustomCheckBox = (props) => {
    const { onClick, name, handleValidation, initCheck, ...restProps } = props
    let initChecked = false
    if(initCheck)
        initChecked = true
    const [checked, setChecked] = React.useState(initChecked);

    const handleChange = (event) => {
        console.log("e")
        if(handleValidation)
            handleValidation(event)
        setChecked(event.target.checked)
        if (onClick)
            onClick(event)
    };


    return (
        <Block {...restProps}>
            <ThemeProvider theme={theme}>
                <FormControlLabel
                    name={name}
                    label={props.label}
                    control={<Checkbox checked={initCheck ? initCheck : checked} onChange={(e) => {handleChange(e)}} />}
                />
            </ThemeProvider>
        </Block>


    )
}

export default CustomCheckBox