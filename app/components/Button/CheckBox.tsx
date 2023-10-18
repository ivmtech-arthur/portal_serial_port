
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
import { muiTheme } from 'styles/mui';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// const theme = createTheme({
//     components: {
//         MuiCheckbox: {
//             styleOverrides: {
//                 root: {
//                     // color: "red"
//                     fontFamily: 'Inter',
//                     "&.Mui-checked": {
//                         color: "purple"
//                     }
//                 },
//                 // checked: {
//                 //     color: "purple"
//                 // }
//             }
//         },

//     },
// })

const Icon = ({ icon }) => (
    <FontAwesomeIcon
        // className="align-middle"
        icon={icon}
        // fixedWidth
    />
);

const CustomCheckBox = (props) => {
    const { onClick, name, handleValidation, initCheck,color, ...restProps } = props
    let initChecked = false
    if (initCheck)
        initChecked = true
    const [checked, setChecked] = React.useState(initChecked);
    const [focused, setFocused] = useState(false);

    const handleChange = (event) => {
        console.log("e")
        if (handleValidation)
            handleValidation(event)
        setChecked(event.target.checked)
        if (onClick)
            onClick(event)
    };


    return (
        <Block {...restProps}>
            <ThemeProvider theme={muiTheme}>
                <FormControlLabel
                    name={name}
                    label={props.label}
                    control={<Checkbox
                        className={focused ? "focused" : ""}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        color={color || 'primary'}
                        icon={<Icon icon={faSquare} />}
                        checkedIcon={<Icon icon={faCheckSquare} />}
                        checked={initCheck ? initCheck : checked}
                        onChange={(e) => { handleChange(e) }} />}
                />
            </ThemeProvider>
        </Block>


    )
}

export default CustomCheckBox