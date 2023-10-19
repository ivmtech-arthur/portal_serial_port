import BasicButton from "components/Button/BasicButton"
import SimpleCard from "components/Card/simpleCard"
import ExpandableRowTable from "components/Table/expandableTable"
import CustomTable3 from "components/Table/newTable"
import { Add, MoneyOff } from "@mui/icons-material"
import * as Icon from "react-feather";
import { FormControl, Input, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from "@mui/material"
import BasicTextField from "components/TextField/basicTextField"
import CustomCheckBox from "components/Button/CheckBox"
import CustomRadioGroup from "components/Button/RadioGroup"
export default function Test() { 
    
    return (
        <>
        {/* <ExpandableRowTable/> */}
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
  {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
  <Select
    // labelId="demo-simple-select-label"
    // id="demo-simple-select"
    value={20}
    // label="Age"
    // onChange={handleChange}
  >
    
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
            </FormControl>
            <BasicTextField
                type="textarea"
                size="small" color="primary" id="outlined-basic" placeholder="outlined" variant="outlined" sx={{
                padding: '10px'
            }} />
            <BasicTextField size="small" color="primary" id="outlined-basic" placeholder="outlined" variant="outlined" sx={{
                padding: '10px'
            }}/>
            <BasicTextField size="small" color="primary" id="outlined-basic" placeholder="outlined" variant="outlined" sx={{
                padding: '10px'
            }} maxRows={Infinity} multiline InputProps={{ endAdornment: <Add /> }} />
            <CustomCheckBox label="test"/>
             {/* <InputLabel htmlFor="name" shrink='true'>Name</InputLabel> */}
            <CustomRadioGroup options={[1,2,3]} />
            <Input color="primary" id="outlined-basic" placeholder="outlined" InputLabelProps={{ shrink: true, style: { padding: '1px' } }} />
        </>
    )
} 

