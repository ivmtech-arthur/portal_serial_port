import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import { useEffect } from "react";

function FilterForm(props) {
    const { criterias, selectedCriteria, onChange } = props
    console.log("FilterForm", criterias, selectedCriteria, onChange)
    useEffect(() => { 
        // const result = criterias();
        // console.log("FilterForm", result, selectedCriteria, onChange)
        
    },[])
    var selectGroup = []
    for (var index in criterias) { 
        criterias[index]
        const sublist = criterias[index].map((item, index2) => {
            return (<MenuItem value={item}>{item}</MenuItem>)
        })
        selectGroup.push(
            <Select id="" value={selectedCriteria[index]} onChange={(e) => {
                onChange(e.target.value, index)
            }} >
                {sublist}

            </Select>
        )
    }
   
    return (
        <FormControl>
            <TextField>test</TextField>
            {selectGroup}
        </FormControl>
    )
}
 
export default FilterForm