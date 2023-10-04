import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker'
import React, { useRef, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import {
    createTheme,
    ThemeProvider,
    styled as muiStyled,
} from '@mui/material/styles'
import Button from '@mui/material/Button'
import { MuiPickersUtilsProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { shouldForwardProp } from '../Common/Element/styled-props-handler'
import styled from 'styled-components'
import { compose } from 'styled-system'
import basicStyledSystem from '../Common/Element/basic-styled-system'
const CustCalendar = muiStyled(CalendarPicker, { shouldForwardProp: (prop) => shouldForwardProp(prop, 'test') })(({ theme, ...otherProps }) => ({
    // border: '10px solid red',
    '& .MuiPickersDay-root': {
        '&.Mui-disabled': {
            // border: '1px solid red',
            backgroundColor: 'transparent',
            color: 'purple1',
        },
        '&not(.Mui-selected)': {
            // border: '1px solid red',
            backgroundColor: 'yellow',
            color: 'white',
        },
        // borderRadius:  "50% 0 0 50%"
    },
    ...compose(...basicStyledSystem)
})
)

const CustCalendar2 = styled(CustCalendar)(compose(...basicStyledSystem))

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
                    backgroundColor: 'blue',
                    color: 'white',
                },
            },
        },
        MuiPickersCalendarHeader: {
            styleOverrides: {
                label: ({ ownerState, theme }) =>
                    console.log('owner state', ownerState, theme),
                // let resultObj = {
                //     backgroundColor: "white",
                //     borderRadius: "0%",
                //     margin: '0px',
                //     // ":not(.Mui-selected)": {
                //     //     border: "none"
                //     // }
                // }
                // if (dayjs().add(14, 'day').format("YYYYMMDD") == dayjs(ownerState.day).format("YYYYMMDD"))
                //     resultObj.borderRadius = "0% 50% 50% 0%"
                // return (resultObj)
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    backgroundColor: 'blue',
                    color: 'white',
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
                    backgroundColor: 'blue',
                    color: 'white',
                    margin: '0px',
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
                // root:{
                //     backgroundColor: "transparent",
                //     color: 'blue',
                // },
            },
        },
        MuiPickersDay: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    let resultObj = {
                        backgroundColor: 'white',
                        borderRadius: '0%',
                        margin: '0px',
                        // ":not(.Mui-selected)": {
                        //     border: "none"
                        // }
                    }
                    if (
                        dayjs().add(14, 'day').format('YYYYMMDD') ==
                        dayjs(ownerState.day).format('YYYYMMDD')
                    )
                        resultObj.borderRadius = '0% 50% 50% 0%'
                    return resultObj
                },

                // root:{
                //     backgroundColor: "blue",
                //     borderRadius: "0%",
                //     // test: value
                // },
                today: {
                    // backgroundColor: "green",
                    borderRadius: '50% 0 0 50%',
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
        MuiButtonBase: {
            defaultProps: {
                // The default props to change
                disableRipple: true, // No more ripple, on the whole application 💣!
            },
            styleOverrides: {
                root: {
                    backgroundColor: 'yellow',
                    // color: 'blue',
                },
                // disabled: {
                //     backgroundColor: "grey",
                // },
            },
        },
        MuiButton: {
            defaultProps: {
                // The default props to change
                disableRipple: true, // No more ripple, on the whole application 💣!
            },
            styleOverrides: {
                root: {
                    backgroundColor: 'red',
                    // color: 'blue',
                },
            },
        },
    },
})

function DefaultProps() {
    return (
        <ThemeProvider theme={theme}>
            <Button>This button has disabled ripples.</Button>
        </ThemeProvider>
    )
}

function Calendar() {
    const handleCustCalendarChange = (e) => {
    }

    useEffect(() => { }, [])

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <CalendarPicker
                    onChange={handleCustCalendarChange}
                    // className="custButton"
                    // minDate={dayjs().toDate()}
                    // maxDate={dayjs().add(14, 'day').toDate()}
                /> */}
                <ThemeProvider theme={theme}>
                    <Button className="custButton">test</Button>

                    <CustCalendar
                        shouldDisableYear={() => {
                            return true
                        }}
                        onChange={handleCustCalendarChange}
                        minDate={dayjs().toDate()}
                        maxDate={dayjs().add(14, 'day').toDate()}
                    />
                </ThemeProvider>
            </LocalizationProvider>

        </div>
    )
}

export default Calendar
