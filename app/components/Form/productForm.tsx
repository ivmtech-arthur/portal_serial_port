import Block from 'components/Common/Element/Block'
import forgetPassword from '../../data/auth/forgetPassword'
import general from '../../data/general'
import get from 'lodash/get'
import { useStore } from 'store'
import { useCallback, useEffect, useState } from 'react'
import BasicButton from 'components/Button/BasicButton'
import BasicTextField from 'components/TextField/basicTextField'
import { AlertColor, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import StyledDropDownButton from 'components/TextField/styledDropDownButton'
import Popup from 'components/Popup'
import axios from 'axios'
import { withCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import BasicSnackBar, { SnackBarProps } from 'components/snackbar'
import { Prisma } from '@prisma/client'
import { ChangeProductInput, CreateProductInput } from 'lib/validations/product.schema'
import UploadButton from 'components/Button/UploadButton'
import { productContent } from 'data/product'
import { handleDeleteS3 } from 'lib/helper'
import Image from 'next/image'




const getFieldList = (fieldConfig, handleChangeFormData, errors, placeholderMap, handleValidation, fields, data, mode, cloudURL, schema) => {
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
                            uppercase={fieldConfig[key].uppercase}
                            className={fieldConfig[key].className}
                            onChange={(e) => {
                                if (fieldConfig[key].uppercase) {
                                    handleChangeFormData(key, e.target.value.toUpperCase())
                                } else {
                                    handleChangeFormData(key, e.target.value)
                                }

                            }}
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
            case "preview":
                let attachment = data?.attachment;
                if (attachment) {
                    const { type, tableName, attachmentDisplayID, name } = attachment
                    result.push(
                        <Grid item xs={12} md={6}>
                            <Image
                                src={`https://${cloudURL}/${schema}/${type}/${tableName}/${attachmentDisplayID}/${name}`}
                                // layout="fill"
                                width="100%"
                                height="100%"
                            />
                        </Grid>
                    )
                }

        }
    }

    return result
}

const ProductForm = (props) => {
    const { getInitFields, handleOnSubmit, handleValidation, errors, parentCallback, fields, userTypeData, userRoleData, mode = "view", productData } = props


    const initFields: ChangeProductInput = mode == "add" ? {
        productName: "",
        productNameEn: "",
        desc: "",
        descEn: "",
        weight: 0,
        price: 0,
        unitPrice: 0,
        unit: "",
        currency: "",
        abbreviation: "",
        clientRefID: "",
        remark: "",
        attachment: null,
    } : {
        productName: productData.productName,
        productNameEn: productData.productNameEn,
        desc: productData.desc,
        descEn: productData.descEn,
        price: productData.price,
        weight: productData.weight,
        unitPrice: productData.unitPrice,
        unit: productData.unit,
        currency: productData.currency,
        abbreviation: productData.abbreviation,
        clientRefID: productData.clientRefID,
        remark: productData.remark,
        attachment: {},
        currentAttachment: productData.attachment,
    }

    const fieldConfig = {
        ...(mode != "add" && {
            productDisplayID: {
                type: "textField",
                disabled: true,
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
        weight: {
            type: "number",
        },
        price: {
            type: "number",
            step: '0.01',
            min: '0',
        },
        unitPrice: {
            type: "number",
        },
        unit: {
            type: "textField",
        },
        currency: {
            type: "textField",
        },
        abbreviation: {
            type: "textField",
            uppercase: true,
        },
        clientRefID: {
            type: "textField",
        },
        remark: {
            type: "textArea",
        },
        attachment: {
            type: "upload",
        },
        currentAttachment: {
            type: "preview",
        }
    }

    const {
        state: {
            site: { lang, systemConstant: { cloudFrontURL, schema } },
            user
        },
        dispatch
    } = useStore()
    const { cookies } = props
    const token = cookies.get("accessToken")
    const generalString = get(general, lang)
    const productString = get(productContent, lang)
    const forgetPasswordString = get(forgetPassword, lang)
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [formData, setFormData] = useState({})
    const [updateFields, setUpdateFields] = useState<any>({})
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



    const handleUpdate = (fields) => {
        var needUpdate = false
        var updateField = {}
        for (const field in fields) {
            if (fields[field] && initFields[field] != fields[field]) {
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
    }

    const handleUpdateS3 = async (attachment, attachmentRecord, token) => {
        const data = new FormData()
        data.append("file", attachment);
        data.set("type", attachment.type.split('/')[0])
        data.set("collection", "masterProduct")
        data.set("id", attachmentRecord.attachmentDisplayID)
        await axios.post('/api/aws/s3', data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
    }


    const handleSubmit = async () => {
        // fields
        if (mode == "edit") {
            let attachment: File = fields.attachment;
            delete updateFields.attachment
            let select: Prisma.MasterProductSelect = {
                attachment: true,
                productDisplayID: true,
            }

            let data: Prisma.MasterProductUpdateInput = {
                ...(attachment && {
                    attachment: {
                        update: {
                            type: attachment.type.split('/')[0],
                            name: attachment.name,
                            tableName: "masterProduct"
                        }

                    }
                }),
                ...updateFields
            }
            const result = await axios.put(`/api/prisma/masterProduct/${productData.productID}`, { data, select }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(async ({ data }) => {
                const { result } = data
                let attachmentRecord = result.attachment
                await handleDeleteS3(fields.currentAttachment, token).catch((e) => { throw (e) })
                await handleUpdateS3(attachment, attachmentRecord, token)
                handleSetHandleBarProps(true, () => { router.reload() }, productString.editProductSnackBar, "success")
                return result
            }).catch((e) => {
                console.log("axios req error", e)
                handleSetHandleBarProps(true, () => { }, `${e}`, "error")
            })
        } else if (mode == "add") {
            let attachment: File = fields.attachment;
            delete fields.attachment
            let select: Prisma.MasterProductSelect = {
                attachment: true,
                productDisplayID: true,
            }
            let data: Prisma.MasterProductCreateInput = {
                ...(attachment && {
                    attachment: {
                        create: {
                            type: attachment.type.split('/')[0],
                            name: attachment.name,
                            tableName: "masterProduct"
                        }

                    }
                }),
                ...fields
            }
            let result = await axios.post(`/api/prisma/masterProduct`, { data, select }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(async ({ data }) => {
                const { result } = data
                let attachmentRecord = result.attachment
                if (result.attachment) {
                    await handleUpdateS3(attachment, attachmentRecord, token)
                }
                handleSetHandleBarProps(true, () => { router.push(`${lang}/product-management/product-list`) }, productString.editProductSnackBar, "success")
                return result
            }).catch((err) => {
                console.log(err)
                handleSetHandleBarProps(true, () => { }, `${err}`, "error")
            })
        }

    }

    useEffect(() => {
        if (getInitFields)
            getInitFields(initFields)
    }, [])

    const fieldList = getFieldList(fieldConfig, handleChangeFormData, errors, productString, handleValidation, fields, productData, mode, cloudFrontURL, schema)

    return (
        <Block
            className="flex flex-col items-center justify-around md:p-20 xs:p-5"
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
                    }, mode == "edit" ? "changeProduct" : "createProduct")
                }}>{generalString.confirm}</BasicButton>
                <BasicButton className="mt-10 ml-3 w-32" onClick={(e) => {
                    router.back()
                }}>{generalString.back}</BasicButton>
            </Block>
            <BasicSnackBar {...snackBarProps} />
            <Popup type="local" propsToPopup={{ proceedFunc: async () => { await handleSubmit() }, title: productString.productFormPopupTitle, message: productString.productFormPopupMessage }} />
        </Block>
    )
}

export default withCookies(ProductForm)