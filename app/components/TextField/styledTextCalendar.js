import Block from 'components/Common/Element/Block'
import styled, { css } from 'styled-components'
import { useState } from 'react'
import { CalendarPicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs';
//  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
    createTheme,
    ThemeProvider,
    styled as muiStyled,
} from '@mui/material/styles'
//import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import TextField

const Container2 = styled(Block)`
    ${(props) => props.errors && props.childprops && props.errors[props.childprops.id] && css`
        {
            /* background-color: ivory; */
            /* border: none; */
            border: 2px solid red;
            
            /* border-radius: 5px;   */
        },
    `}

        box-sizing: border-box;
        
        /* Auto layout */
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 6px 8px 6px 20px;
        gap: 16px;

        /* position: absolute; */
        height: 60px;
        left: 20px;
        top: 20px;

        /* Light grey 2 */
        background: #FAFAFA;

        border: 1px solid #959595;
        border-radius: 20px;
        width: 100%;
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
        background-image: url('/svg/icon_calendar_black.svg');
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

// const Container2 = styled(Block)`

// `
const theme = createTheme({
    components: {
        MuiDisabled: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    color: 'blue',
                },

            },
        },
        MuiCalendarPicker: {
            styleOverrides: {
                root: {
                    // backgroundColor: 'blue',
                    // color: 'white',
                },
            },
        },
        MuiDayPicker: {
            styleOverrides: {
                // root:{
                //     backgroundColor: "blue",
                //     color: 'white',
                // },
                weekDayLabel: {
                    // backgroundColor: 'blue',
                    // color: 'white',
                    // margin: '0px',
                },
            },
        },
        MuiPickersDay: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    let resultObj = {
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        marginLeft: '1px',
                        marginRight: '1px',
                        "&:hover":{
                            backgroundColor: 'grey',
                        },
                        "&.Mui-selected":{
                            backgroundColor: 'purple',
                        }
                        // ":not(.Mui-selected)": {
                        //     border: "none"
                        // }
                    }
                    
                    // if (
                    //     dayjs().add(14, 'day').format('YYYYMMDD') ==
                    //     dayjs(ownerState.day).format('YYYYMMDD')
                    // )
                    //     resultObj.borderRadius = '0% 50% 50% 0%'
                    return resultObj
                },

                // root:{
                //     backgroundColor: "blue",
                //     borderRadius: "0%",
                //     // test: value
                // },
                today: {
                    // backgroundColor: "green",
                    // borderRadius: '50% 0 0 50%',
                },
                // disabled: {
                //     backgroundColor: "red",
                // },
                // selected: {
                //     borderRadius: "50%",
                // }
            },
        },
        // Name of the component ⚛️
    },
})


const StyledTextCalendar = (props) => {
    const { errors,value,onChange,handleValidation,...restProps } = props
    const [showCalendar, setShowCalendar] = useState(false)
    const [date, setDate] = useState()
    const [displayValue,setDisplayValue] = useState(value)
    let error = false
    // if(props.id)
    //     props.id = "id"
    const setError = (e) => {
        error = true
    }

    function handleClick(e) {
        if (!props.id) return
        var x = document.getElementById(props.id)
        setShowCalendar(!showCalendar)

    }
    return (
        <Block position='relative' {...restProps} width='100%'>
            <Container2 errors={errors} childprops={{ id: props.id, type: "password" }}>
                {/* <i id='left-icon' aria-hidden="true" style={{ backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></i> */}
                <input
                    id={props.id}
                    type="text"
                    name={props.name}
                    placeholder={props.placeholder}
                    onChange={props.handleValidation}
                    value={displayValue}
                />
                {/* <input type="reset" value="Reset" ></input> */}

                <button style={{ border: 'none', background: 'none' }} onClick={(e) => {
                    handleClick(e)
                    // console.log("ONCLICK,", e, a.value)
                }}><i id="right-icon" aria-hidden="true" style={{ backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} /></button>
            </Container2>
            <Block display={showCalendar ? 'block' : 'none'} position='absolute' bg='white' zIndex='10'>
                <LocalizationProvider 
                //dateAdapter={AdapterDayjs}
                >
                    <ThemeProvider theme={theme}>
                        <CalendarPicker 
                            
                            onChange={(newValue) => {
                                setShowCalendar(false)
                                setDisplayValue(newValue.format("YYYY/MM/DD"))
                                if(handleValidation)
                                    handleValidation({name: props.name,value: newValue})
                                if(onChange)
                                    onChange(newValue.format("YYYY/MM/DD"))
                              }}
                        />
                    </ThemeProvider>

                </LocalizationProvider>

            </Block>
            {errors && errors[props.id] && <Block display='flex'><i aria-hidden="true" className='error-icon' /><Block color='errorRed'>{errors[props.id]}</Block></Block>}
        </Block>

    )
}

export default StyledTextCalendar