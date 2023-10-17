import BasicButton from "components/Button/BasicButton"
import SimpleCard from "components/Card/simpleCard"
import ExpandableRowTable from "components/Table/expandableTable"
import CustomTable3 from "components/Table/newTable"
import { MoneyOff } from "@mui/icons-material"
import * as Icon from "react-feather";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
export default function Test() { 
    
    return (
        <>
        <ExpandableRowTable/>
            <CustomTable3 />
            <SimpleCard image={{
                src: "/image/logo.jpg",
                width: "359px",
                height:"316px"
            }} desc="test test" title="test title" />
            <BasicButton
                variant="contained"
                startIcon={<Icon.Smile />}
                // endIcon={ <Icon.Smile />}
            >
                testyoyo
                {/* <Icon.Smile /> */}
                {/* <Icon.Smile className="pr-1 w-4" /> */}
            </BasicButton>
            <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    // labelId="demo-simple-select-label"
    // id="demo-simple-select"
    value={20}
    // label="Age"
    // onChange={handleChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>
        </>
    )
} 

