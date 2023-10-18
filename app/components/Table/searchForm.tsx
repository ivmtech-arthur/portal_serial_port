import Block from 'components/Common/Element/Block'
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import BasicButton from "components/Button/BasicButton";
import { useEffect, useState } from "react";
import { Box } from "react-feather";


function SearchForm(props) {
    const { criterias, selectedCriteria, onChange } = props
    const [tempsearchs, setTempsearchs] = useState({})
    // console.log("searchForm", criterias, selectedCriteria, onChange)



    // var selectGroup = []
    // for (var index in criterias) {
    //     const tempIndex = index
    //     // criterias[index]
    //     const sublist = criterias[index].map((item, index2) => {
    //         return (<MenuItem value={item}>{item}</MenuItem>)
    //     })
    //     selectGroup.push(
    //         <Grid item xs={6}>
    //             <FormControl className="p-2" fullWidth>
    //                 <InputLabel id={index}>{index}</InputLabel>
    //                 <Select value={selectedCriteria ? selectedCriteria[index] : ""} labelId={index} key={index} label={index} onChange={(e) => {
    //                     tempsearchs[e.target.value] = tempIndex
    //                     setTempsearchs({ ...tempsearchs })
    //                     // onChange(e.target.value, tempIndex)
    //                 }} >
    //                     {sublist}

    //                 </Select>
    //             </FormControl>

    //         </Grid>

    //     )
    // }

    return (

        // <Grid container spacing={2}>
        <Box className="flex-1">
            <TextField label="search here"></TextField>
            {/* <Select value={selectedCriteria ? selectedCriteria[index] : ""} labelId="demo-simple-select-label" key={"2"} label={"xdd"} onChange={(e) => {
                    onChange(e.target.value, index)
                }} > */}

            {/* </Select> */}

            <BasicButton onClick={() => {
                onChange(tempsearchs)
            }}>Confirm</BasicButton>
        </Box>
           
        // </Grid>

    )
}

export default SearchForm