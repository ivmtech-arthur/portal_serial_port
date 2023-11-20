import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Block from 'components/Common/Element/Block'
import BasicButton from "components/Button/BasicButton";
import StyledDropDownButton from "components/TextField/styledDropDownButton";
import general from "data/general";
import { useStore } from 'store'
import { get } from 'lodash';
import { useEffect, useState } from "react";


function FilterForm(props) {
    const { criterias, selectedCriteria, onChange } = props
    const [tempFilters, setTempFilters] = useState({})
    const {
        state: {
            site: { lang },
        },
    } = useStore()
    const generalString = get(general, lang)
    console.log("FilterForm props", criterias, selectedCriteria, onChange, tempFilters)



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
                    <StyledDropDownButton
                        variant="outlined"
                        value={Object.keys(selectedCriteria).length > 0 ? selectedCriteria[index] : tempFilters[index]}
                        labelId={index} key={index}
                        label={index}
                        onChange={(e) => {
                            tempFilters[tempIndex] = e.target.value
                            setTempFilters({ ...tempFilters })
                            // onChange(e.target.value, tempIndex)
                        }}
                        options={criterias[index].map(item => {
                            return {
                                value: item,
                                label: item,
                            }
                        })}
                    >
                        {/* {sublist} */}

                    </StyledDropDownButton>
                </FormControl>

            </Grid>

        )
    }

    return (
        <Block className="flex flex-col p-4">
            <Grid container spacing={2}>
                {/* <TextField>test</TextField> */}
                {/* <Select value={selectedCriteria ? selectedCriteria[index] : ""} labelId="demo-simple-select-label" key={"2"} label={"xdd"} onChange={(e) => {
                    onChange(e.target.value, index)
                }} > */}

                {/* </Select> */}
                {selectGroup}

            </Grid>
            <Block className="flex items-center justify-center">
                <BasicButton
                    className="my-2 mr-1"
                    onClick={() => {
                        setTempFilters({})
                        onChange({})
                    }}>{generalString.cancel}</BasicButton>
                <BasicButton className="my-2 ml-1" onClick={() => {

                    onChange(tempFilters)
                }}>Confirm</BasicButton>
            </Block>
        </Block>
    )
}

export default FilterForm