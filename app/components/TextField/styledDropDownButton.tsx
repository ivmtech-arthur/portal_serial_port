import Block from 'components/Common/Element/Block'
import StyledBody4 from 'components/Common/Element/body4'
import styled, { css } from 'styled-components'
import { useState } from 'react'
import StyledTextField from './styledTextField'
import { map } from 'lodash'
import StyledSelectOption from './styledSelectOption'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, IconButton, MenuItem, Select, SelectChangeEvent, SvgIcon, TableFooter, TablePagination, InputBase } from '@mui/material';
import { muiTheme } from 'styles/mui'
import { hexToRgbA } from 'lib/helper'

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

const StyledDropDownButton = (props) => {
    const { id,name,error, color, options, value, onChange, variant,handleValidation, ...restProps } = props
    const [showDropDownList, setDropDownList] = useState(false)
    const [currValue, setCurrValue] = useState(value)
    console.log("value",value)
    function myFunction(e) {
        if (!props.id) return
        setDropDownList(!showDropDownList)

    }

    // const getValue = (e) => {
    //     if (e && e.target && e.target.value) {
    //         setCurrValue(e.target.value)
    //         setDropDownList(false)
    //         if (onChange)
    //             onChange(e.target.value)
    //     }

    // }

    const list = map(options, (option, index) => {
        return (
            <MenuItem value={option.value}>{option.label}</MenuItem>
            // <StyledSelectOption hover value={option} type="select" onChange={getValue}></StyledSelectOption>
        )
    })
    return (
        <Select
            error={error}
            variant={variant || 'filled'}
            // color={error ? 'error' : (color || 'primary')}
            // className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:ring-violet-300 rounded-sm text-white pl-2"
            // labelId="demo-simple-select-label"
            id={id}
            name={name}
            // displayEmpty
            sx={{
                textDecorationColor: "white",
                padding: '0.5px',
                // ":focus": {
                //     outline: 'none',
                // }
            }}
            onChange={(e) => { 
                setCurrValue(e.target.value)
                // e.target.value
                if (handleValidation) { 
                    handleValidation(e,"number")
                }
                onChange(e)
            }}
            value={`${value}`}
            // input={null}
            IconComponent={KeyboardArrowDownIcon}
            input={
                <BootstrapInput color={color || 'primary'} theme={muiTheme}
                    inputProps={{
                        variant: variant || 'filled'
                    }}
                />}
        // label="Age"
        // IconComponent={muiTheme.direction === "rtl" ? KeyboardArrowUpIcon : KeyboardArrowDownIcon}
        // onChange={(e) => {
        //     onChange(e)
        // }}
        >
            {list}
            {/* <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem> */}
        </Select>
        // <Block {...restProps}   

        // // className="bg-[#6f42c1] border-4 border-white focus:border-[#ba9ceb]  hover:bg-[#3e4676]"
        // >
        //     <Container 

        //     errors={errors}  
        //     showDropDownList={showDropDownList}>

        //         <button 
        //        className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:ring-violet-300 rounded-sm text-white pl-2"
        //         // style={{ border: 'none', background: 'none' }} 
        //         onChange={(e) => {
        //             myFunction(e)
        //             // console.log("onChange,", e, a.value)
        //         }}>
        //            {currValue || value}
        //            {showDropDownList && <KeyboardArrowUpIcon/>}
        //            {!showDropDownList && <KeyboardArrowDownIcon/>}
        //             {/* <i id="right-icon" aria-hidden="true" style={{ backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} /> */}
        //             </button>
        //     </Container>
        //     <Block 

        //     className={`${showDropDownList ? "block": "hidden"} bg-[#FAFAFA] border-grey border absolute z-10 w-auto`}
        //     // display={showDropDownList ? 'block' : 'none'}
        //     //     backgroundColor="#FAFAFA"
        //     // borderRadius="16px"
        //     // position='absolute' 
        //     // zIndex="9"
        //     >
        //         {list}
        //     </Block>
        // </Block>

    )
}

export default StyledDropDownButton