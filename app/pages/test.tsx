import BasicButton from "components/Button/BasicButton"
import SimpleCard from "components/Card/simpleCard"
import ExpandableRowTable from "components/Table/expandableTable"
import CustomTable3 from "components/Table/newTable"
import { Add, CloudUpload, MoneyOff } from "@mui/icons-material"
import * as Icon from "react-feather";
import { Alert, Button, FormControl, Input, InputLabel, MenuItem, Select, Snackbar, TextField, TextareaAutosize } from "@mui/material"
import BasicTextField from "components/TextField/basicTextField"
import CustomCheckBox from "components/Button/CheckBox"
import CustomRadioGroup from "components/Button/RadioGroup"
import { ChangeEvent, useState } from "react"
import BasicSnackBar from "components/snackbar"
import styled from "@emotion/styled"
import axios from "axios"
// import { createReadStream, fsync } from "fs"

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function Test() {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null)
    const handleClick = () => {
        setOpen(true);
    };

    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files[0])
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <>
            {/* <ExpandableRowTable/> */}
            <CustomTable3 />
            <SimpleCard image={{
                src: "/image/logo.jpg",
                width: "359px",
                height: "316px"
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
                textarea
                size="small" color="primary" id="outlined-basic" placeholder="outlined" variant="outlined" sx={{
                    padding: '10px'
                }} />
            <BasicTextField size="small" color="primary" id="outlined-basic" placeholder="outlined" variant="outlined" sx={{
                padding: '10px'
            }} />
            <BasicTextField size="small" color="primary" id="outlined-basic" placeholder="outlined" variant="outlined" sx={{
                padding: '10px'
            }} maxRows={Infinity} multiline InputProps={{ endAdornment: <Add /> }} />
            <CustomCheckBox label="test" />
            {/* <InputLabel htmlFor="name" shrink='true'>Name</InputLabel> */}
            <CustomRadioGroup options={[1, 2, 3]} />
            <Button variant="outlined" onClick={handleClick}>
                Open success snackbar
            </Button>
            <BasicSnackBar open={open} severity={"error"} message="test" handleClose={() => { }} />
            <Button component="label" variant="contained" startIcon={<CloudUpload />}>
                Upload file
                <VisuallyHiddenInput onChange={(e) => {
                    handleUpload(e)
                }} type="file" id="file" />
            </Button>
            <Button variant="contained" onClick={async () => {
                console.log("file", file)
                if (file instanceof File) {
                    let fileBuffer = await file.arrayBuffer()
                    // let blob = new Blob([fileBuffer]);
                    const data = new FormData()
                    let newFile = new File([fileBuffer], file.name, {
                        type: file.type,
                    });
                    data.append("file", file);
                    data.set("id", "att")
                    data.set("type", file.type.split('/')[0])
                    data.set("collection", "test")
                    // const data = {
                    //     file: file,
                    //     id: "att",
                    //     type: "test",
                    //     collection: "反"
                    // }
                await axios.post('/api/aws/test', data,
                    {
                        // headers: {
                        //     // 'Content-Type': 'application/json',
                        //     'Content-Type': `multipart/form-data`
                        // },
                    }
                ).then((result) => {
                    console.log("result", result)
                }).catch((err) => {
                    console.log("error api", err)
                })
            }

            }}>submit</Button >
            {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:'right' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
            
            <Alert severity="error">This is an error message!</Alert>
            <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert> */}
    {/* <Input color="primary" id="outlined-basic" placeholder="outlined" InputLabelProps={{ shrink: true, style: { padding: '1px' } }} /> */ }
        </>
    )
}

