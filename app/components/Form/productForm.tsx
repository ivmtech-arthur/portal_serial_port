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
import { Prisma } from '@prisma/client'
import { CreateProductInput } from 'lib/validations/product.schema'
import UploadButton from 'components/Button/UploadButton'
import { Blob } from 'buffer'
import { productContent } from 'data/product'
import { clientGetDisplayID } from 'lib/helper'




const getFieldList = (fieldConfig, handleChangeFormData, errors, placeholderMap, handleValidation, fields, data, mode) => {
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
                                value: data[key]
                            } : {})}
                            placeholder={placeholderMap[`${key}Placeholder`]}
                            handleValidation={handleValidation}
                            error={errors[key]}
                            id={key}
                            name={key}
                            disabled={(key == "userID" && mode == "edit") || mode == "view" || fieldConfig[key].disabled}
                            {...(key == "password" || key == "passwordConfirm" ? {
                                type: "password"
                            } : {})}
                        />
                    </Grid>

                )
                break;
            case "number":
                result.push(
                    <Grid item xs={12} md={6}>
                        <InputLabel className="h5" shrink htmlFor="bootstrap-input">
                            {placeholderMap[`${key}Placeholder`]}
                        </InputLabel>
                        <BasicTextField
                            type="number"
                            inputProps={{
                                min: fieldConfig[key].min,
                                step: fieldConfig[key].step,
                            }}
                            // oninput="validity.valid||(value='');"
                            onChange={(e) => {
                                handleChangeFormData(key, parseFloat(e.target.value))
                            }}

                            {...(mode != "add" ? {
                                value: data[key]
                            } : {
                                value: 0
                            })}
                            placeholder={placeholderMap[`${key}Placeholder`]}
                            handleValidation={handleValidation}
                            error={errors[key]}
                            id={key}
                            name={key}
                            disabled={mode == "view" || fieldConfig[key].disabled}
                        />
                    </Grid>

                )
                break
            case "textArea":
                result.push(
                    <Grid item xs={12} md={6}>
                        <InputLabel className="h5" shrink htmlFor="bootstrap-input">
                            {placeholderMap[`${key}Placeholder`]}
                        </InputLabel>
                        <BasicTextField
                            textarea
                            className="grid"
                            onChange={(e) => { handleChangeFormData(key, e.target.value) }}
                            placeholder={placeholderMap[`${key}Placeholder`]}
                            handleValidation={handleValidation}
                            error={errors[key]}
                            id={key}
                            name={key}
                            disabled={mode == "view" || fieldConfig[key].disabled}
                        />
                    </Grid>
                )
                break;
            case "select":
                const options = fieldConfig[key].options
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
                                disabled={mode == "view" || fieldConfig[key].disabled}
                            />
                        </FormControl>

                    </Grid>

                )
                break;
            case "upload":
                result.push(
                    <Grid item xs={12} md={6}>
                        <UploadButton
                            id={key}
                            name={key}
                            component="label"
                            error={errors[key]}
                            color="primary"
                            variant="contained"
                            handleValidation={handleValidation}
                            onChange={(file: Blob) => {
                                handleChangeFormData(key, file)
                            }}>
                            {placeholderMap[`${key}Placeholder`]}
                        </UploadButton>
                    </Grid>
                )
                break;
        }
    }

    return result
}

const productForm = (props) => {
    const { getInitFields, handleOnSubmit, handleValidation, errors, parentCallback, fields, userTypeData, userRoleData, mode = "view", productData } = props

    console.log("product form", props)

    const initFields: CreateProductInput = mode == "add" ? {
        productName: "",
        productNameEn: "",
        desc: "",
        descEn: "",
        price: 0,
        unitPrice: 0,
        remark: "",
        attachment: {},
    } : {
        productName: productData.productName,
        productNameEn: productData.productNameEn,
        desc: productData.desc,
        descEn: productData.descEn,
        price: productData.price,
        unitPrice: productData.unitPrice,
        remark: productData.remark,
        attachment: productData.attachment,
    }

    const fieldConfig = {
        ...(mode != "add" && {
            productDisplayID: {
                type: "textField",
            }
        }),
        productName: {
            type: "textField",
        },
        productNameEn: {
            type: "textField",
        },
        desc: {
            type: "textArea",
        },
        descEn: {
            type: "textArea",
        },
        price: {
            type: "number",
            step: '0.01',
            min: '0',
        },
        unitPrice: {
            type: "number",
        },
        remark: {
            type: "textArea",
        },
        attachment: {
            type: "upload",
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
    const productString = get(productContent, lang)
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

    const handleChangeFormData = useCallback((field, value) => {
        formData[field] = value
        setFormData({ ...formData })
    }, [formData])



    const handleUpdate = useCallback((fields) => {
        var needUpdate = false
        var updateField = {}
        for (const field in fields) {
            if (initFields[field] != fields[field]) {
                needUpdate = true
                updateField[field] = fields[field]
            }
        }
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
        console.log("fields", fields)
        // fields
        if (mode == "edit") {
            var data: any = { data: updateFields };
            await axios.put(`/api/prisma/product/${fields.productID}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((data) => {
                console.log("success!!")
                handleSetHandleBarProps(true, () => { router.reload() }, productString.editUserSnackBar, "success")
            })
            // await internalAPICallHandler(req)
        } else if (mode == "add") {
            // const data = { data: fields }
            let attachment: File = fields.attachment;
            delete fields.attachment
            let data: Prisma.MasterProductCreateInput = {
                productDisplayID: await clientGetDisplayID(token, "msaterProduct"),
                ...(attachment && {
                    attachment: {
                        create: {
                            type: attachment.type.split('/')[0],
                            name: attachment.name,
                            attachmentDisplayID: await clientGetDisplayID(token, "msaterProduct"),
                            tableName: "MasterProduct"
                        }

                    }
                }),
                ...fields
            }
            console.log("data", data)
            await axios.post(`/api/prisma/masterProduct/0`, { data }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((data) => {
                console.log("success!!", lang)
                handleSetHandleBarProps(true, () => { router.push(`/${lang}/setting/product`); }, productString.createdUserSnackBar, "success")
                // router.push(`/${lang}/setting/product`);
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

    const fieldList = getFieldList(fieldConfig, handleChangeFormData, errors, productString, handleValidation, fields, productData, mode)

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
                    }, mode == "edit" && fields.password == "" ? "edit" : "createProduct")
                }}>{generalString.confirm}</BasicButton>
                <BasicButton className="mt-10 ml-3 w-32" onClick={(e) => {
                    router.back()
                    // router.push('')
                }}>{generalString.back}</BasicButton>
            </Block>
            <BasicSnackBar {...snackBarProps} />
            <Popup type="local" propsToPopup={{ proceedFunc: () => { handleSubmit() }, title: productString.productFormPopupTitle, message: productString.productFormPopupMessage }} />
        </Block>
    )
}

export default withCookies(productForm)