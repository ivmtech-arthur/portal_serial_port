import Block from 'components/Common/Element/Block'
import StyledTextField from '../TextField/styledTextField'
import StyledTextFieldPassword from '../TextField/styledTextFieldPassword'
import StyledH2 from 'components/Common/Element/H2'
import Button1 from '../Button/Button1'
import Button2 from '../Button/Button2'
import Button7 from '../Button/Button7'
import CustomCheckBox from '../Button/CheckBox'
import forgetPassword from '../../data/auth/forgetPassword'
import general from '../../data/general'
import { userContent } from 'data/user'
import get from 'lodash/get'
import { useStore } from 'store'
import { useEffect, useState } from 'react'
import BasicButton from 'components/Button/BasicButton'
import BasicTextField from 'components/TextField/basicTextField'
import { RegisterUserInput } from 'lib/validations/user.schema'
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import StyledDropDownButton from 'components/TextField/styledDropDownButton'





const getFieldList = (fieldConfig, handleChangeFormData, errors, placeholderMap, handleValidation, fields, userData,mode) => {
    var result = []
    for (const key in fieldConfig) {
        switch (fieldConfig[key].type) {
            case "textField":
                result.push(
                    <Grid item xs={12} md={6}>
                        <InputLabel className="h5" shrink htmlFor="bootstrap-input">
                            {placeholderMap[`${key}Placeholder`]}
                        </InputLabel>
                        <BasicTextField
                            onChange={(e) => { handleChangeFormData(key, e.target.value) }}
                            {...(mode == "edit" ? {
                                value: userData[key]
                            } : {})}
                            placeholder={placeholderMap[`${key}Placeholder`]}
                            handleValidation={handleValidation}
                            error={errors[key]}
                            id={key}
                            name={key}
                            {...(key == "password" || key == "passwordConfirm" ? {
                                type: "password"
                            } : {}) }
                        />
                    </Grid>

                )
                break;
            case "textArea":
                result.push(
                    <Grid item xs={12} md={6}>
                        <InputLabel className="h5"  shrink htmlFor="bootstrap-input">
                            {placeholderMap[`${key}Placeholder`]}
                        </InputLabel>
                        <BasicTextField
                            type="textarea"
                            onChange={(e) => { handleChangeFormData(key, e.target.value) }}
                            placeholder={placeholderMap[`${key}Placeholder`]}
                            handleValidation={handleValidation}
                            error={errors[key]}
                            id={key}
                            name={key}
                        />
                    </Grid>
                )
                break;
            case "select":
                const optionList = fieldConfig[key].options.map((option) => {
                    return (
                        <MenuItem value={option}>{option}</MenuItem>
                    )
                })
                result.push(
                    <Grid item xs={12} md={6}>
                        <InputLabel className="h5" shrink htmlFor="bootstrap-input">
                            {placeholderMap[`${key}Placeholder`]}
                        </InputLabel>
                        <FormControl fullWidth>
                           
                            <StyledDropDownButton
                                variant="outlined"
                                id={key}
                                name={key}
                                error={errors[key]}
                                value={fields[key]}
                                options={fieldConfig[key].options}
                                handleValidation={handleValidation}
                                onChange={(e: SelectChangeEvent) => {
                                    // e.target.value = parseInt(e.target.value)
                                    console.log("handleChange",)
                                    handleChangeFormData(key,parseInt(e.target.value))
                                }}
                                // onChange={(e) => { handleChange(e) }}
                            />
                            {/* <Select
                                // placeholder={placeholderMap[`${key}Placeholder`]}
                                renderValue={(selected) => {
                                    if (selected === 0) {
                                        return <em>Placeholder</em>;
                                    }

                                // return selected.join(', ');
                                }}
                                // labelId="demo-simple-select-label"
                                id={key}
                                name={key}
                                value={1}
                            // label="Age"
                            onChange={handleChange}
                            >
                                <MenuItem disabled value="">
                                    <em>Placeholder</em>
                                </MenuItem>
                                {optionList}
                            </Select> */}
                        </FormControl>

                    </Grid>

                )
                break;
        }
    }

    return result
}

const AccountForm = (props) => {
    const { getInitFields, handleOnSubmit, handleValidation, errors, parentCallback, fields, userTypeData, userRoleData,mode,userData } = props
    
    console.log("account form", props)

    const initFields: RegisterUserInput = mode == "add" ? {
        name: "",
        nameEn: "",
        userID: "",
        password: "",
        passwordConfirm: "",
        userType: 1,
        userRole: 1,
    } : {
            name: userData.name,
            nameEn: userData.nameEn,
            userID: userData.userID,
            password: "",
            passwordConfirm: "",
            userType: userData.userType,
            userRole: userData.userRole,
    }
    
    const fieldConfig = {
        name: {
            type: "textField",
        },
        nameEn: {
            type: "textField",
        },
        userID: {
            type: "textField",
        },
        password: {
            type: "textField",
        },
        passwordConfirm: {
            type: "textField",
        },
        userType: {
            type: "select",
            options: userTypeData.map((data) => { 
                return {
                    value: data.userTypeID,
                    label: data.userTypeName,
                }
            }),
        },
        userRole: {
            type: "select",
            options: userRoleData.map((data) => {
                return {
                    value: data.userRoleID,
                    label: data.userRoleName,
                }
            }),
        },
    }
    
    const {
        state: {
            site: { lang },
        },
    } = useStore()
    const generalString = get(general, lang)
    const userString = get(userContent, lang)
    const forgetPasswordString = get(forgetPassword, lang)
    const [email, setEmail] = useState("")
    const [formData, setFormData] = useState({})

    const handleChangeFormData = (field, value) => {
        formData[field] = value
        setFormData({ ...formData })
    }

    useEffect(() => {
        if (getInitFields)
            getInitFields(initFields)
    }, [])

    const fieldList = getFieldList(fieldConfig, handleChangeFormData, errors, userString, handleValidation, fields, userData,mode)

    return (
        <Block
            className="flex flex-col items-center justify-around md:p-20 xs:p-5"
        // display='flex' flexDirection='column' alignItems='center' justifyContent='space-around' px='180px' height='600px'
        >
            <Grid container spacing={2}>
                {fieldList}
            </Grid>
           
            <BasicButton className="mt-10" onClick={(e) => {
                handleOnSubmit(e, () => { },mode == "edit" ? "edit" : "register")
            }}>{generalString.confirm}</BasicButton>


        </Block>
    )
}

export default AccountForm