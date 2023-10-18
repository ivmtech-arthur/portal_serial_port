import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import BasicButton from "components/Button/BasicButton";
import { useEffect, useState } from "react";


function FilterForm(props) {
    const { criterias, selectedCriteria, onChange } = props
    const [tempFilters, setTempFilters] = useState({})
    // console.log("FilterForm", criterias, selectedCriteria, onChange)


  
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
                        tempFilters[e.target.value] = tempIndex
                        setTempFilters({...tempFilters})
                        // onChange(e.target.value, tempIndex)
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
            <BasicButton onClick={() => { 
                onChange(tempFilters)
            }}>Confirm</BasicButton>
        </Grid>

    )
}

export default FilterForm