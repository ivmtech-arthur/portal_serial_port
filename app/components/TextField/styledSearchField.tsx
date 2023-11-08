import Block from 'components/Common/Element/Block'
import StyledBody4 from 'components/Common/Element/body4'
import styled, { css } from 'styled-components'
import { useState } from 'react'
import StyledTextField from './styledTextField'
import { String, map } from 'lodash'
import StyledSelectOption from './styledSelectOption'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, IconButton, MenuItem, Select, SelectChangeEvent, SvgIcon, TableFooter, TablePagination, InputBase, InputBasePropsColorOverrides, SelectProps, InputProps, Autocomplete, TextField, AutocompleteValue, InputAdornment } from '@mui/material';
import { muiTheme } from 'styles/mui'
import { hexToRgbA } from 'lib/helper'
import { OverridableStringUnion } from '@mui/types'
import {
    createTheme,
    ThemeProvider,
    styled as muiStyled,
} from '@mui/material/styles'
import BasicTextField from './basicTextField'
import BasicButton from 'components/Button/BasicButton'

// import TextField


const BootstrapInput = styled(InputBase)(({ theme, color, inputProps }) => ({
    borderRadius: 4,
    '&.Mui-focused': {
        '& .MuiInputBase-input': {
            // border: '1px solid red',
            borderColor: theme.palette[color].main,
            border: `2px solid ${hexToRgbA(theme.palette[color].main, 1)}`
        },

    },
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: '4px',
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        ...(inputProps.variant == "filled" ? {
            background: hexToRgbA(theme.palette[color].main, 1),
            color: 'white',
        } : {
            // color: 'black',
        }),

        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),

        '&:focus': {
            // ...(inputProps.variant == "outlined" ? {
            //     border: `2px solid ${hexToRgbA(theme.palette[color].main)}`
            // } : {}),
            // borderRadius: 4,
            // borderColor: theme.palette[color].light,
            // boxShadow: `0 0 0 0.2rem ${hexToRgbA(theme.palette[color].light, 0.5) }`,
        },
    },
}));

type styledDropDownButtonProps = {
    id?: string,
    name?: string,
    error?: any,
    color?: OverridableStringUnion<"error" | "primary" | "secondary" | "info" | "success" | "warning", InputBasePropsColorOverrides>
    options?: {
        value: any,
        label: any,
    }[],
    value?: any,
    onChange?: (e) => void,
    variant?: 'standard' | 'outlined' | 'filled',
    handleValidation?: (e, string,customParams?) => void,
    disabled?: boolean,
    placeholder?: string,
    multiple?: boolean,
    [name: string]: any
}

const StyledSearchField = (props: styledDropDownButtonProps) => {
    const { id, name, error, color, options, value, onChange, variant, handleValidation, disabled, placeholder, multiple, ...restProps } = props
    const [showDropDownList, setDropDownList] = useState(false)
    // const [currValue, setCurrValue] = useState(value)

    const list = map(options, (option, index) => {
        return (
            <MenuItem value={option.value}>{option.label}</MenuItem>
        )
    })
    return (
        <ThemeProvider theme={muiTheme}>
            <Autocomplete
                color={!error ? (color || "primary") : "error"}
                multiple={multiple}
                // error={error}
                // variant={variant || 'filled'}
                id={id}
                // name={name}
                sx={{
                    textDecorationColor: "white",
                    // padding: '0.5px',
                }}
                value={value}
                onChange={(e, value: any) => {
                    if (value) {
                        console.log("onChange", value.value)
                        let customE: any = {
                            ...e
                        }
                        customE.target.value = value.value
                        customE.target.id = id
                        customE.target.name = name
                        customE.target.type = "number"
                        // setCurrValue(value.value)
                        if (handleValidation) {
                            //notes: assume ID is value
                            handleValidation(customE, "number"
                            //     {
                            //     action: "defaultValue",
                            //     objParam: {
                            //         price: 2,
                            //         weight: 3.4
                            //     }
                            // }
                            )
                        }
                        onChange(customE)
                    }

                }}
                // onSelect={(e) => {
                //     if (handleValidation) {
                //         handleValidation(e, "string")
                //     }
                //     // onChange(e)
                // }}
                disabled={disabled}
                popupIcon={<KeyboardArrowDownIcon/>}
                // value={`${value}`}
                options={options}
                // IconComponent={KeyboardArrowDownIcon}
                renderInput={(params) => <TextField {...params}
                    placeholder={placeholder}
                    color={!error ? (color || "primary") : "error"}
                    error={error}
                    // InputProps={{
                    //     endAdornment: (
                    //         <InputAdornment position="start">
                    //             {/* <BasicButton variant="text"
                    //             // onClick={() => {
                    //             //     // var x: any = document.getElementById(props.id)
                    //             //     // if (x.type === "password") {
                    //             //     //     x.type = "text";
                    //             //     // } else {
                    //             //     //     x.type = "password";
                    //             //     // }
                    //             // }}
                    //             sx={{
                    //                 color: 'black',
                    //                 "&:hover": {
                    //                     color: 'black',
                    //                 },
                    //                 "&:focus": {
                    //                     boxShadow: 'none'
                    //                 }
                    //             }}><KeyboardArrowDownIcon /></BasicButton> */}
                    //         </InputAdornment>
                    //     )
                    // }}
                />}
               
            // input={
            //     <BootstrapInput color={color || 'primary'} theme={muiTheme}
            //         inputProps={{
            //             variant: variant || 'filled'
            //         }}
            //     />}
            />
            {error && <Block display='flex'><i aria-hidden="true" className='error-icon' /><StyledBody4 color='errorRed'>{error}</StyledBody4></Block>}
        </ThemeProvider>


    )
}

export default StyledSearchField