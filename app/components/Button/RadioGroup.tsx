import { RadioGroup } from "@mui/material"
import Radio from "@mui/material/Radio"
import FormControlLabel from "@mui/material/FormControlLabel"
import React, { useRef, useEffect, useState } from 'react'
import {
    createTheme,
    ThemeProvider,
    styled as muiStyled,
} from '@mui/material/styles'
import Button from '@mui/material/Button'
import SvgIcon from '@mui/material/SvgIcon'
import map from "lodash/map"

const theme = createTheme({
    components: {
        MuiRadio: {
            styleOverrides: {
                root: {
                    fontFamily: 'Inter',
                    // color: "pink",
                    "&:Mui-checked": {
                        color: "black",
                    }
                },
                
            },
        },
    },
})

const CustomRadioGroup = (props) => {
    const {options} = props
    const optionsList = map(options,(option,index) => {
        return(<FormControlLabel value={option} control={<Radio />} label={option} />)
    })
    return (
        <ThemeProvider theme={theme}>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                {optionsList}
                
                
            </RadioGroup>
        </ThemeProvider>

    )
}

export default CustomRadioGroup