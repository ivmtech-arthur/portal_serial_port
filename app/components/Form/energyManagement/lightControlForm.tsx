import { AlertColor, Grid, Input, TextField } from "@mui/material"
import Block from 'components/Common/Element/Block'
import BasicSwitch from "components/switch"
import { useCallback, useEffect, useState } from "react"
import { useStore } from 'store'
import get from 'lodash/get'
import { machineContent } from "data/machine"
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs"
import { TextFields } from "@mui/icons-material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import BasicButton from "components/Button/BasicButton"
import general from "data/general"
import { default as axios } from 'lib/axios'
import BasicSnackBar, { SnackBarProps } from "components/snackbar"
import { useRouter } from "next/router"
import { parse, stringify } from "superjson"
import { Prisma } from "@prisma/client"

// import { TextField} from 

function LightControlForm(props) {
    const { lightData, machineData } = props
    var lightConfig = get<any[], string>(parse(machineData.config), "lightConfig")
    const [params, setParams] = useState({
        json: {
            lampId: 1,
            status: lightData.on ? 1 : 0
        },
        startTime: dayjs(lightData?.startTime?.join(":"), "HH:mm") || dayjs(),
        endTime: dayjs(lightData?.endTime?.join(":"), "HH:mm") || dayjs(),
        lightSwitch: lightConfig.lightSwitch || false,
    })
    const [snackBarProps, setSnackbarProps] = useState<SnackBarProps>({
        open: false,
        handleClose: () => {
        },
        message: "",
        severity: 'success'
    })
    // const [startTime, setStartTime] = useState<Dayjs>(dayjs());
    // const [endTime, setEndTime] = useState<Dayjs>(dayjs());
    const {
        state: {
            site: { lang, pageName },
            user: { accessToken, userProfile }
        },
        dispatch,
    } = useStore()
    const router = useRouter()
    const generalString = get(general, lang)
    const machineString = get(machineContent, lang)

    const setParamsObj = (json, startTime, endTime, lightSwitch) => {
        setParams({
            json: json,
            startTime: startTime,
            endTime: endTime,
            lightSwitch: lightSwitch
        })
    }

    const handleSetHandleBarProps = useCallback((open: boolean, handleClose: () => void, message: String, severity: AlertColor) => {
        setSnackbarProps({
            open: open,
            handleClose: handleClose,
            message: message,
            severity: severity
        })
    }, [])

    const handleSubmit = async () => {
        await axios.post(`/api/socketio/${machineData.machineDisplayID}/controlLight`, {
            payload: {
                json: params.json,
                startTime: params.startTime.format('HH:mm').split(':'),
                endTime: params.endTime.format('HH:mm').split(':')
            },
            // emitOnly: true,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then((result) => {
            // handleSetHandleBarProps(true, () => { router.push(router.asPath.replace('/lightControl', '')) }, machineString.peelingSnackbar, "success")
        }).catch(e => {
            // handleSetHandleBarProps(true, () => { }, `${e}`, "error")
        })

        const { config } = machineData
        var oldConfig = config ? parse<any>(config) : {};
        const { lightConfig, ...restConfig } = oldConfig
        var oldLightConfig = lightConfig
        const { startTime, endTime, ...restParams } = params
        oldLightConfig = {
            startTime: startTime.format("HH:mm").split(":"),
            endTime: endTime.format("HH:mm").split(":"),
            ...restParams
        }
        let data: Prisma.MachineUpdateInput = {
            config: stringify({
                lightConfig: oldLightConfig,
                ...restConfig,
            })
        }

        await axios.put(`/api/prisma/machine/${machineData.machineID}`, { data }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(async ({ data }) => {
            handleSetHandleBarProps(true, () => { router.push(router.asPath.replace('/lightControl', '')) }, machineString.peelingSnackbar, "success")
        }).catch((e) => {
            handleSetHandleBarProps(true, () => { }, `${e}`, "error")
        })
    }

    return (
        <Block
            className="flex flex-col items-center justify-around md:p-20 xs:p-5"
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                        <BasicSwitch disabled value={lightData.on} label={machineString.lightStatusPlaceholder} onChange={(e) => {
                            setParamsObj({
                                lampId: 1,
                                status: e.target.checked ? 1 : 0
                            },
                                params.startTime,
                                params.endTime,
                                params.lightSwitch)
                        }} />
                    </Grid>

                    {params.lightSwitch && <Grid item xs={12} md={6}>
                        <TimePicker
                            renderInput={(props) => { return <TextField {...props} /> }}
                            label="Start Time"
                            value={params.startTime}
                            onChange={(newValue) => setParamsObj(params.json, newValue, params.endTime, params.lightSwitch)}
                        />
                    </Grid>}

                    {params.lightSwitch && <Grid item xs={12} md={6}>
                        <TimePicker
                            renderInput={(props) => { return <TextField {...props} /> }}
                            label="End Time"
                            value={params.endTime}
                            onChange={(newValue) => setParamsObj(params.json, params.startTime, newValue, params.lightSwitch)}
                        />
                    </Grid>}

                    <Grid item xs={12} md={6}>
                        <BasicSwitch value={params.lightSwitch} label={machineString.lightControlPlaceholder} onChange={(e) => {
                            setParamsObj(params.json,
                                params.startTime,
                                params.endTime, e.target.checked)
                        }} />
                    </Grid>

                </Grid>
                <BasicButton className="mt-10 mr-3 w-32" value={lightData.on} onClick={(e) => {
                    console.log("params is ", params)
                    handleSubmit()
                }}>{generalString.confirm}</BasicButton>

                <BasicSnackBar {...snackBarProps} />
            </LocalizationProvider>
        </Block>

    )
}

export default LightControlForm