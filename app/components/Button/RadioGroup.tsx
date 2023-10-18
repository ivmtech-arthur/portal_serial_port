import { RadioGroup, styled } from "@mui/material"
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
import { muiTheme } from "styles/mui"
// import { styled } from "@mui/system"
import { hexToRgbA } from "lib/helper"


// const theme = createTheme({
//     components: {
//         MuiRadio: {
//             styleOverrides: {
//                 root: {
//                     fontFamily: 'Inter',
//                     // color: "pink",
//                     "&:Mui-checked": {
//                         color: "black",
//                     }
//                 },

//             },
//         },
//     },
// })

const BpIcon = styled('span')(({ theme, color }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
        theme.palette.mode === 'dark'
            ? '0 0 0 1px rgb(16 22 26 / 40%)'
            : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    backgroundImage:
        theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
            : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
        boxShadow: `0 0 0 0.2rem ${(theme.palette?.[color].light ? hexToRgbA(theme.palette[color].light, 0.5) : null)}`
    },
    'input:hover ~ &': {
        backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
    },
    'input:focus ~ &': {
        boxShadow: `0 0 0 0.2rem ${(theme.palette?.[color].light ? hexToRgbA(theme.palette[color].light, 0.5) : null)}`
    },
    'input:disabled ~ &': {
        boxShadow: 'none',
        background:
            theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
    },
}));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',

    '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
    },
    'input:hover ~ &': {
        backgroundColor: '#106ba3',
    },
});

const CustomRadioGroup = (props) => {
    const { options, color } = props
    const optionsList = map(options, (option, index) => {
        return (<FormControlLabel value={option} control={
            <Radio
                disableRipple
                color={color || "primary"}
                checkedIcon={<BpCheckedIcon color={color || "primary"} />}
                icon={<BpIcon color={color || "primary"} />}
            />} label={option} />)
    })
    return (
        <ThemeProvider theme={muiTheme}>
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