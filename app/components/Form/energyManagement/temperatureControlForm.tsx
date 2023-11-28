import { Grid } from "@mui/material"
import BasicSwitch from "components/switch"
import { useStore } from 'store'
import get from 'lodash/get'
import { machineContent } from "data/machine"
import BasicTextField from "components/TextField/basicTextField"
import StyledDropDownButton from "components/TextField/styledDropDownButton"
import { default as axios } from 'lib/axios'

function TemperatureControlForm(props) {
    const { temperatureData, machineData } = props
    const {
        state: {
            site: { lang, pageName },
            user: { accessToken, userProfile }
        },
        dispatch,
    } = useStore()
    const machineString = get(machineContent, lang)

    const handleChange = async () => {
        // await axios.post(`/api/socketio/${machineData.machineDisplayID}/controlTemperature`, {
        //     payload: {
        //         // temperatureActionList: [
        //         //     {
        //         //         name: "",
        //         //         value: 0,
        //         //     }
        //         // ]
        //         temperatureActionList: machineString.temperatureActionMap.map((item) => { 
        //             return {
        //                 name: item.name,
        //                 value: 0
        //             }
        //         })
        //     },
        //     action: 0 // notes: 0 means read here
        //     // emitOnly: true,
        // }, {
        //     headers: {
        //         Authorization: `Bearer ${accessToken}`,
        //     },
        // }).then((result) => {
        //     // handleSetHandleBarProps(true, () => { router.push(router.asPath.replace('/lightControl', '')) }, machineString.peelingSnackbar, "success")
        // }).catch(e => {
        //     // handleSetHandleBarProps(true, () => { }, `${e}`, "error")
        // })
    }

    return (
        <Grid container spacing={1}>
            <StyledDropDownButton variant="outlined" options={machineString.temperatureActionMap.map((item) => {
                return {
                    label: item.name,
                    value: item.name
                }
            })} onChange={(e) => {
                handleChange()
            }} />
            {/* <BasicSwitch value={temperatureData.on} label={machineString.temperatureControlPlaceholder} onChange={() => {

            }} /> */}
            <BasicTextField disabled value="" />
        </Grid>
    )
}

export default TemperatureControlForm