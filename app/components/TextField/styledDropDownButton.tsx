import Block from 'components/Common/Element/Block'
import StyledBody4 from 'components/Common/Element/body4'
import styled, { css } from 'styled-components'
import { useState } from 'react'
import StyledTextField from './styledTextField'
import { map } from 'lodash'
import StyledSelectOption from './styledSelectOption'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, IconButton, MenuItem, Select, SelectChangeEvent, SvgIcon, TableFooter, TablePagination,InputBase } from '@mui/material';

// import TextField


const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        background: '#6f42c1',
        color: 'white',
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
            borderRadius: 4,
            borderColor: '#ba9ceb',
            boxShadow: '0 0 0 0.2rem #ba9ceb',
        },
    },
}));

const Container = styled(Block)`
    ${(props) => props.errors && props.childprops && props.errors[props.childprops.id] && css`
        {
            /* background-color: ivory; */
            /* border: none; */
            border: 2px solid red;
            
            /* border-radius: 5px;   */
        },
    `}
    ${(props) => css`
            #right-icon{
                background-image: ${props.showDropDownList ? "url('/svg/icon_vector_up.svg')" : "url('/svg/icon_vector_down.svg')"};
            /* background-image: url('/svg/eye.svg'); */
             {
                
            }
        },
    `}

        /* box-sizing: border-box; */
        
        /* Auto layout */
        /* display: flex;
        flex-direction: row;
        align-items: center;
        padding: 6px 8px 6px 20px;
        gap: 16px;

        /* position: absolute; */
        height: 30px;
        left: 20px;
        top: 20px; */

        /* Light grey 2 */
        /* background: #FAFAFA;

        border: 1px solid #959595;
        border-radius: 20px; */
        /* width: 100%; */
        /* @media (min-width: 620px) {
            width: 600px;
        } */
        /* pointer-events: none; */

    &:focus-within{
        border: 1px solid #333333;
        
        > i {
            background:url('/svg/Search_black.svg');
        }
        > input::placeholder{
            color: #333333;
        }
    }

    .error-msg {
        display: none;
    }

    input:invalid {
        
        /* & {
            background-color: ivory;
            border: none;
            outline: 2px solid red;
            border-radius: 5px;
        } */

        /* error-msg {
            background-color: red;
            display: flex;
        } */
    }


    #left-icon {
        left:0;
        padding:10px 10px;
        background-image:url('/svg/Search_grey.svg');
        /* color:#30A3F1; */
    }

    #right-icon {
        /* left:0;   */
        /* width: 20px;
        height: 20px; */
        padding:10px 20px;

        /* color:#30A3F1; */
    }

    input {
        
        width: 100%;
        height: 100%;
        border: none;
        background: #FAFAFA;
        /* pointer-events: auto; */
     }

    
`


const StyledDropDownButton = (props) => {
    const { errors, options, value, onChange, theme,apiRef, ...restProps } = props
    const [showDropDownList, setDropDownList] = useState(false)
    const [currValue, setCurrValue] = useState(null)
    let error = false
    // if(props.id)
    //     props.id = "id"
    const setError = (e) => {
        error = true
    }

    function myFunction(e) {
        if (!props.id) return
        setDropDownList(!showDropDownList)

    }

    const getValue = (e) => {
        if (e && e.target && e.target.value) {
            setCurrValue(e.target.value)
            setDropDownList(false)
            if (onChange)
                onChange(e.target.value)
        }

    }

    const list = map(options, (option, index) => {
        return (
            <MenuItem value={option}>{option}</MenuItem>
            // <StyledSelectOption hover value={option} type="select" onChange={getValue}></StyledSelectOption>
        )
    })
    return (
        <Block>
            <Select
                // className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:ring-violet-300 rounded-sm text-white pl-2"
                // labelId="demo-simple-select-label"
                id="demo-simple-select"
                displayEmpty
                sx={{
                    textDecorationColor: "white", 
                    // ":focus": {
                    //     outline: 'none',
                    // }
                }}
                value={value}
                input={<BootstrapInput theme={theme}/>}
                // label="Age"
                IconComponent={theme.direction === "rtl" ? KeyboardArrowUpIcon : KeyboardArrowDownIcon}
                onChange={(e) => {
                    onChange(e)
                }}
            >
                {list}
                {/* <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem> */}
            </Select>
        </Block>
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