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
import { useCallback, useEffect, useState } from 'react'
import BasicButton from 'components/Button/BasicButton'
import BasicTextField from 'components/TextField/basicTextField'
import { RegisterUserInput } from 'lib/validations/user.schema'
import { AlertColor, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import StyledDropDownButton from 'components/TextField/styledDropDownButton'
import Popup from 'components/Popup'
import { CustomRequest, internalAPICallHandler } from 'lib/api/handler'
import axios from 'axios'
import { withCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import BasicSnackBar, { SnackBarProps } from 'components/snackbar'





const getFieldList = (fieldConfig, handleChangeFormData, errors, placeholderMap, handleValidation, fields, userData, mode) => {
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
                            disabled={(key == "userID" && mode == "edit") || mode == "view" }
                            {...(key == "password" || key == "passwordConfirm" ? {
                                type: "password"
                            } : {})}
                        />
                    </Grid>

                )
                break;
            case "textArea":
                result.push(
                    <Grid item xs={12} md={6}>
                        <InputLabel className="h5" shrink htmlFor="bootstrap-input">
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
                const options = fieldConfig[key].options
                console.log("options", fields, options, key, options.find(option => option.value === fields[key]))
                // const optionList = fieldConfig[key].options.map((option) => {
                //     return (
                //         <MenuItem value={option}>{option}</MenuItem>
                //     )
                // })
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
                                value={options.find(option => option.value === fields[key])?.value}
                                options={options}
                                handleValidation={handleValidation}
                                onChange={(e: SelectChangeEvent) => {
                                    // e.target.value = parseInt(e.target.value)
                                    console.log("handleChange",)
                                    handleChangeFormData(key, parseInt(e.target.value))
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
    const { getInitFields, handleOnSubmit, handleValidation, errors, parentCallback, fields, userTypeData, userRoleData, mode = "view", userData } = props

    console.log("account form", props)

    const initFields: RegisterUserInput = mode == "add" ? {
        name: "",
        nameEn: "",
        userID: "",
        username: "",
        password: "",
        passwordConfirm: "",
        userType: 1,
        userRole: 1,
    } : {
        name: userData.name,
        nameEn: userData.nameEn,
        userID: userData.userID,
        username: userData.username,
        password: "",
        passwordConfirm: "",
        userType: userData.userType.userTypeID,
        userRole: userData.userRole.userRoleID,
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
        username: {
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
        dispatch
    } = useStore()
    const { cookies } = props
    const token = cookies.get("userToken")
    const generalString = get(general, lang)
    const userString = get(userContent, lang)
    const forgetPasswordString = get(forgetPassword, lang)
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [formData, setFormData] = useState({})
    const [updateFields, setUpdateFields] = useState({})
    const [snackBarProps, setSnackbarProps] = useState<SnackBarProps>({
        open: false,
        handleClose: () => {
        },
        message: "",
        severity: 'success'
    })
    const handleSetHandleBarProps = useCallback((open: boolean, handleClose: () => void, message: String, severity: AlertColor) => {
        setSnackbarProps({
            open: open,
            handleClose: handleClose,
            message: message,
            severity: severity
        })
    }, [])

    const handleChangeFormData = (field, value) => {
        formData[field] = value
        setFormData({ ...formData })
    }



    const handleUpdate = useCallback((fields) => {
        var needUpdate = false
        var updateField = {}
        for (const field in fields) {
            console.log("comparing field", initFields[field], fields[field], fields, initFields)
            if (initFields[field] != fields[field]) {
                needUpdate = true
                updateField[field] = fields[field]
            }
        }
        console.log("handleUpdate", fields, initFields)
        if (needUpdate) {
            setUpdateFields({ ...updateField })
            dispatch({
                type: 'showPopup',
                payload: {
                    popup: true,
                    popupType: 'confirmProceed',
                    isGlobal: false,
                },
            })
        }
    }, [])

    const handleSubmit = useCallback(async () => {
        // fields
        if (mode == "edit") {
            console.log()
            var data: any = { data: updateFields };
            var req: CustomRequest = {
                query: {
                    where: {
                        userID: "SuperAdmin"
                    }
                },
                body: {
                    updateFields
                },
                method: "PUT"
            }
            await axios.put(`/api/prisma/user/${fields.userID}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((data) => {
                console.log("success!!")
                handleSetHandleBarProps(true, () => { router.reload() }, userString.editUserSnackBar,"success")
            })
            // await internalAPICallHandler(req)
        } else {
            // const data = { data: fields }
            await axios.post(`/api/auth/register`, fields, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((data) => {
                console.log("success!!", lang)
                handleSetHandleBarProps(true, () => { router.push(`/${lang}/setting/account`); }, userString.createdUserSnackBar, "success")
                // router.push(`/${lang}/setting/account`);
            })
            // var req2: CustomRequest = {
            //     // query: {
            //     //     where: {
            //     //         userID: "SuperAdmin"
            //     //     }
            //     // },
            //     body: {
            //         updateFields
            //     },
            //     method: "POST"
            // }
            // await internalAPICallHandler(req2)
        }

    }, [updateFields, fields])

    useEffect(() => {
        if (getInitFields)
            getInitFields(initFields)
    }, [])

    const fieldList = getFieldList(fieldConfig, handleChangeFormData, errors, userString, handleValidation, fields, userData, mode)

    return (
        <Block
            className="flex flex-col items-center justify-around md:p-20 xs:p-5"
        // display='flex' flexDirection='column' alignItems='center' justifyContent='space-around' px='180px' height='600px'
        >
            <Grid container spacing={2}>
                {fieldList}
            </Grid>

            <Block className="flex justify-between">
                <BasicButton className="mt-10 mr-3 w-32" onClick={(e) => {
                    handleOnSubmit(e, (fields) => {
                        if (mode == "edit")
                            handleUpdate(fields)
                        else {
                            handleSubmit()
                        }
                    }, mode == "edit" && fields.password == "" ? "edit" : "register")
                }}>{generalString.confirm}</BasicButton>
                <BasicButton className="mt-10 ml-3 w-32" onClick={(e) => {
                    router.back()
                    // router.push('')
                }}>{generalString.back}</BasicButton>
            </Block>
            <BasicSnackBar {...snackBarProps} />
            <Popup type="local" propsToPopup={{ proceedFunc: () => { handleSubmit() }, title: userString.accountFormPopupTitle, message: userString.accountFormPopupMessage }} />
        </Block>
    )
}

export default withCookies(AccountForm)