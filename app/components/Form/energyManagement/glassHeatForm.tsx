import { Grid } from "@mui/material"
import BasicSwitch from "components/switch"
import { useStore } from 'store'
import get from 'lodash/get'
import { machineContent } from "data/machine"

function GlassHeatControlForm(props) {
    const { glassheatData } = props
    const {
        state: {
            site: { lang, pageName },
        },
        dispatch,
    } = useStore()
    const machineString = get(machineContent, lang)
    return (
        <Grid container spacing={1}>
            <BasicSwitch value={glassheatData.on} label={machineString.glassheatControlPlaceholder} onChange={() => {

            }} />
        </Grid>
    )
}

export default GlassHeatControlForm