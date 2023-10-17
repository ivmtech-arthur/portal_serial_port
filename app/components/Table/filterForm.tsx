import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect } from "react";

function FilterForm(props) {
    const { criterias, selectedCriteria, onChange } = props
    // console.log("FilterForm", criterias, selectedCriteria, onChange)
    useEffect(() => {
        // const result = criterias();
        // console.log("FilterForm", result, selectedCriteria, onChange)

    }, [])
    var selectGroup = []
    for (var index in criterias) {
        const tempIndex = index
        // criterias[index]
        const sublist = criterias[index].map((item, index2) => {
            return (<MenuItem value={item}>{item}</MenuItem>)
        })
        selectGroup.push(
            <Grid item xs={6}>
                <FormControl className="p-2" fullWidth>
                    <InputLabel id={index}>{index}</InputLabel>
                    <Select value={selectedCriteria ? selectedCriteria[index] : ""} labelId={index} key={index} label={index} onChange={(e) => {
                         console.log("onChange2",e.target.value,tempIndex)
                        onChange(e.target.value, tempIndex)
                    }} >
                        {sublist}

                    </Select>
                </FormControl>

            </Grid>

        )
    }

    return (

        <Grid container spacing={2}>
            {/* <TextField>test</TextField> */}
            {/* <Select value={selectedCriteria ? selectedCriteria[index] : ""} labelId="demo-simple-select-label" key={"2"} label={"xdd"} onChange={(e) => {
                    onChange(e.target.value, index)
                }} > */}

            {/* </Select> */}
            {selectGroup}
        </Grid>

    )
}

export default FilterForm