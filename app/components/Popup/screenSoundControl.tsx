import { Grid, TextField } from "@mui/material"
import BasicSwitch from "components/switch"
import { useStore } from 'store'
import get from 'lodash/get'
import { machineContent } from "data/machine"
import { useCallback, useEffect, useState } from "react"
import BasicSlider from "components/slider"
import { VolumeUp } from "@mui/icons-material"
import Block from 'components/Common/Element/Block'
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import general from "data/general"
import BasicButton from "components/Button/BasicButton"
import CloseIcon from '@mui/icons-material/Close'
const ScreenSoundControlForm = (props) => {
    const { screenSoundData, isOpen, closePopup, proceedFunc, mode } = props
    const {
        state: {
            site: { lang, pageName },
        },
        dispatch,
    } = useStore()
    const [params, setParams] = useState({
        startTime: screenSoundData?.startTime ? screenSoundData?.startTime : dayjs("06:00","HH:mm"),
        endTime: screenSoundData?.endTime ? screenSoundData?.endTime : dayjs("00:00", "HH:mm"),
        soundSwitch: screenSoundData?.soundSwitch || false,
        screenSwitch: screenSoundData?.screenSwitch || false,
        volume: screenSoundData?.volume || 0,
        brightness: screenSoundData?.brightness || 0,
    })
    const setParamsObj = (startTime, endTime, soundSwitch, screenSwitch, volume, brightness) => {
        setParams({
            startTime: startTime,
            endTime: endTime,
            soundSwitch: soundSwitch,
            screenSwitch: screenSwitch,
            volume: volume,
            brightness: brightness
        })
    }
    const generalString = get(general, lang)
    const machineString = get(machineContent, lang)
    return (
        <Block
            className="rounded-md bg-white bg-clip-padding md: relative"
        >
            <BasicButton className="absolute right-0" variant="text" onClick={() => { 
                closePopup()
            }}>
                <CloseIcon />
            </BasicButton>
            <Block className="popupContainer p-4" display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100%'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid container spacing={1}>

                        <Grid item xs={12} md={6}>
                            <TimePicker
                                renderInput={(props) => { return <TextField {...props} /> }}
                                label="Start Time"
                                value={params.startTime}
                                onChange={(newValue) => setParamsObj(newValue, params.endTime, params.soundSwitch, params.screenSwitch, params.volume, params.brightness)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TimePicker
                                renderInput={(props) => { return <TextField {...props} /> }}
                                label="End Time"
                                value={params.endTime}
                                onChange={(newValue) => setParamsObj(params.startTime, newValue, params.soundSwitch, params.screenSwitch, params.volume, params.brightness)}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <BasicSwitch value={screenSoundData?.soundSwitch} label={machineString.soundControlPlaceholder} onChange={(e) => {
                                setParamsObj(params.startTime, params.endTime, e.target.checked, params.screenSwitch, params.volume, params.brightness)
                            }} />
                        </Grid>
                        {params.soundSwitch && <Grid item xs={12} md={6}>
                            <BasicSlider startIcon={<VolumeUp />} name="Volume" value={Math.round((screenSoundData?.volume ? screenSoundData?.volume : 0) * 100)} onChange={(e,value) => {
                                setParamsObj(params.startTime, params.endTime, params.soundSwitch, params.screenSwitch, value / 100, params.brightness)
                            }} />
                        </Grid>}
                        <Grid item xs={12} md={6}>
                            <BasicSwitch value={screenSoundData?.screenSwitch} label={machineString.screenControlPlaceholder} onChange={(e) => {
                                setParamsObj(params.startTime, params.endTime, params.soundSwitch, e.target.checked, params.volume, params.brightness)
                            }} />
                        </Grid>
                        {params.screenSwitch && <Grid item xs={12} md={6}>
                            <BasicSlider startIcon={<VolumeUp />} name="Brightness" value={Math.round((screenSoundData?.brightness ? screenSoundData?.brightness : 0) * 100)} onChange={(e,value) => {
                                setParamsObj(params.startTime, params.endTime, params.soundSwitch, params.screenSwitch, params.volume, value / 100)
                            }} />
                        </Grid>}


                        <BasicButton className="mt-10 mr-3 w-32" onClick={(e) => {

                            if (proceedFunc) {
                                proceedFunc(params, () => {
                                    closePopup()
                                })
                            }

                        }}>{generalString.confirm}</BasicButton>


                    </Grid>
                </LocalizationProvider>
            </Block>


        </Block>

    )
}

export default ScreenSoundControlForm