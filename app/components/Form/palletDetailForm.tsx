import Block from 'components/Common/Element/Block'
import general from '../../data/general'
import get from 'lodash/get'
import find from 'lodash/find'
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
import { ChangeMachineInput, CreateMachineInput } from 'lib/validations/machine.schema'
import UploadButton from 'components/Button/UploadButton'
import { palletContent } from 'data/pallet'
import { ExtendFile, handleDeleteS3 } from 'lib/helper'
import Image from 'next/image'
import StyledSearchField from 'components/TextField/styledSearchField'
import { signServerToken } from 'lib/jwt'
import machineType from 'pages/[lang]/machine-management/machine-Type'
import { serialize, stringify } from 'superjson'
import { ChangePalletDetailInput } from 'lib/validations/pallet.schema'
import { Delete, KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material'
import { ChangeProductInput } from 'lib/validations/product.schema'




const getFieldList = (fieldConfig, handleChangeFormData, errors, placeholderMap, handleValidation, fields, data, mode, cloudURL, schema) => {
    console.log("getFieldList", data, fields, mode)
    var result = []
    for (const key in fieldConfig) {
        var options = []
        switch (fieldConfig[key].type) {
            case "textField":
                result.push(
                    <Grid item xs={6} sm={4} md={3}>
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
                    <Grid item xs={6} sm={4} md={3}>
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
                                value: fields[key]
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
                    <Grid item xs={6} sm={4} md={3}>
                        <InputLabel className="h5" shrink htmlFor="bootstrap-input">
                            {placeholderMap[`${key}Placeholder`]}
                        </InputLabel>
                        <BasicTextField
                            textarea
                            className="grid"
                            onChange={(e) => { handleChangeFormData(key, e.target.value) }}
                            placeholder={placeholderMap[`${key}Placeholder`]}
                            handleValidation={handleValidation}
                            {...(mode == "edit" ? {
                                value: data[key]
                            } : {})}
                            error={errors[key]}
                            id={key}
                            name={key}
                            disabled={mode == "view" || fieldConfig[key].disabled}
                        />
                    </Grid>
                )
                break;
            case "select":
                options = fieldConfig[key].options
                result.push(
                    <Grid item xs={6} sm={4} md={3}>
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
                    <Grid item xs={6} sm={4} md={3}>
                        <UploadButton
                            id={key}
                            name={key}
                            component="label"
                            error={errors[key]}
                            color="primary"
                            variant="contained"
                            multiple={fieldConfig[key].multiple}
                            usageMap={fieldConfig[key].usageMap}
                            handleValidation={handleValidation}
                            onChange={(file: Blob, deleteIndex) => {
                                handleChangeFormData(key, file, deleteIndex)
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
                        <Grid item xs={6} md={3}>
                            <Image
                                src={`https://${cloudURL}/${schema}/${type}/${tableName}/${attachmentDisplayID}/${name}`}
                                // layout="fill"
                                width="100%"
                                height="100%"
                            />
                        </Grid>
                    )
                }
                break;
            case "textSearch":
                options = fieldConfig[key].options
                result.push(
                    <Grid item xs={6} sm={4} md={3}>
                        <InputLabel className="h5" shrink htmlFor="bootstrap-input">
                            {placeholderMap[`${key}Placeholder`]}
                        </InputLabel>
                        <StyledSearchField
                            id={key}
                            name={key}
                            error={errors[key]}
                            value={options.find(option => option.value === fields[key])}
                            options={options}
                            handleValidation={handleValidation}
                            onChange={(e) => {
                                handleChangeFormData(key, parseInt(e.target.value))
                                console.log("onChange2", parseInt(e.target.value))
                            }}
                        />
                    </Grid>
                )

        }
    }

    return result
}

const PalletDetailForm = (props) => {
    const { getInitFields, handleOnSubmit, handleValidation, setDefaultValue, errors, parentCallback, fields, index, masterProductData, clientUserData, mode = "view", machineData, palletDetailData, handleChildChange, palletNo, childCallbackFetcher, parentInvoke, setChildResult } = props


    const initFields: ChangePalletDetailInput = mode == "add" ? {
        palletID: palletNo || 0,
        description: "",
        // machineID: machineData.machineID,
        productID: 0,
        inventory: 0,
        price: 0,
        // clientRefID: "",
        weightPerUnit: 0,
        file: null,
        // currentAttachment: {},
    } : {
        palletID: palletDetailData.palletID,
        description: palletDetailData.description,
        // machineID: machineData.machineID,
        productID: palletDetailData.productID,
        inventory: palletDetailData.inventory,
        price: palletDetailData.price,
        weightPerUnit: palletDetailData.weightPerUnit,
        file: null,
        currentAttachment: palletDetailData.attachment || {},
    }

    const fieldConfig = {
        ...(mode != "add" && {
            palletDetailDisplayID: {
                type: "textField",
                disabled: true,
            }
        }),
        palletID: {
            type: "number",
        },
        description: {
            type: "textArea",
        },
        productID: {
            type: "textSearch",
            options: masterProductData.map((data) => {
                return {
                    value: data.productID,
                    label: data.productName
                }
            })
        },
        inventory: {
            type: "number"
        },
        price: {
            type: "number"
        },
        weightPerUnit: {
            type: "number"
        },
        file: {
            type: "upload",
        },
        currentAttachment: {
            type: "preview",
        }
    }

    const {
        state: {
            site: { lang, systemConstant: { cloudFrontURL, schema } },
            user: { accessToken }
        },
        dispatch
    } = useStore()
    const { cookies } = props
    const token = cookies.get("accessToken")
    const generalString = get(general, lang)
    const palletString = get(palletContent, lang)
    const router = useRouter()
    const [formData, setFormData] = useState(mode == "add" ? initFields : fields)
    const [focus, setFocus] = useState(mode == "add")
    const [updateFields, setUpdateFields] = useState<any>({})
    const [snackBarProps, setSnackbarProps] = useState<SnackBarProps>({
        open: false,
        handleClose: () => {
        },
        message: "",
        severity: 'success'
    })
    const [fetcher, setFetcher] = useState()
    const handleSetHandleBarProps = useCallback((open: boolean, handleClose: () => void, message: String, severity: AlertColor) => {
        setSnackbarProps({
            open: open,
            handleClose: handleClose,
            message: message,
            severity: severity
        })
    }, [])


    const handleChangeFormData = (field, value, deleteArrayIndex) => {
        console.log("handleChangeFormData", field, value, deleteArrayIndex)
        let tempFormData = formData
        switch (field) {
            case "productID":
                let obj: any = {}
                let a = masterProductData as ChangeProductInput[]
                // find(masterProductData)
                let matchProduct = a.find((singleProductData) => {
                    return singleProductData.productID == value
                })
                tempFormData['productID'] = value
                tempFormData['price'] = matchProduct.price
                tempFormData['weightPerUnit'] = matchProduct.weight
                //notes:  override the component update here so need add this field
                obj['productID'] = value
                obj['price'] = matchProduct.price
                obj['weightPerUnit'] = matchProduct.weight
                console.log("handleChangeFormData", field, value, matchProduct, masterProductData, tempFormData, obj)

                setDefaultValue(obj)
                break
            default:
                tempFormData[field] = value
                break;
        }
        // setFormData({ ...tempFormData })
        if (handleChildChange)
            handleChildChange(index, tempFormData)


    }



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
        data.set("collection", "machine")
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
            let select: Prisma.MachineSelect = {
                // attachment: true,
                machineDisplayID: true,
            }

            let data: Prisma.MachinePalletDetailUpdateInput = {
                ...(attachment && {
                    attachment: {
                        update: {
                            type: attachment.type.split('/')[0],
                            name: attachment.name,
                            tableName: "machine"
                        }

                    }
                }),

                ...updateFields
            }
            // { data, select, files: formData }
            const result = await axios.put(`/api/prisma/machinePalletDetail/${palletDetailData.palletDetailID}`, { data }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then(async ({ data }) => {
                const { result } = data
                let attachmentRecord = result.attachment
                await handleDeleteS3(fields.currentAttachment, token).catch((e) => { throw (e) })
                await handleUpdateS3(attachment, attachmentRecord, token)
                handleSetHandleBarProps(true, () => { router.reload() }, palletString.editmachineSnackBar, "success")
                return result
            }).catch((e) => {
                console.log("axios req error", e)
                handleSetHandleBarProps(true, () => { }, `${e}`, "error")
            })
        } else if (mode == "add") {
            console.log("fields", fields)
            const { attachment, machineID, productID, ...restFields } = fields
            delete fields.attachment
            let select: Prisma.MachinePalletDetailSelect = {
                attachment: true,
                palletDetailDisplayID: true,
                machineID: true,
            }
            let data: Prisma.MachinePalletDetailCreateInput = {
                ...(attachment && {
                    attachment: {
                        create: {
                            type: attachment.type.split('/')[0],
                            name: attachment.name,
                            tableName: "masterProduct",
                            tableUsage: "default",
                        }

                    }
                }),
                machine: {
                    connect: {
                        machineID: machineID
                    }
                },
                masterProduct: {
                    connect: {
                        productID: productID
                    }
                },
                status: "created",
                // serverToken: await signServerToken({sub:}),
                ...restFields
            }
            const formData = new FormData()
            // { data, select, files: attachments }
            formData.append("data", stringify(data))
            formData.set("select", stringify(select))
            // formData.set("files", attachments)

            formData.append("files", attachment)

            // let result = await axios.post(`/api/prisma/machinePalletDetail`, formData, {
            //     headers: {
            //         Authorization: `Bearer ${accessToken}`,
            //         // 'Content-Type': 'multipart/form-data',
            //     },
            // }).then(async ({ data }) => {
            //     const { result } = data
            //     let attachmentRecord = result.attachment
            //     if (result.attachment) {
            //         await handleUpdateS3(attachment, attachmentRecord, token)
            //     }
            //     handleSetHandleBarProps(true, () => { router.push(`/${lang}/machine-management`) }, palletString.editmachineSnackBar, "success")
            //     return result
            // }).catch((err) => {
            //     console.log(err)
            //     handleSetHandleBarProps(true, () => { }, `${err}`, "error")
            // })
        }

    }

    const handleDelete = () => {

    }

    useEffect(() => {
        if (getInitFields)
            getInitFields(initFields)
        // if (childCallbackFetcher) (
        //     childCallbackFetcher(handleOnSubmit)
        // )

    }, [])
    useEffect(() => {
        if (parentInvoke && setChildResult)

            setChildResult(testFunc())
        // console.log("handleOnSubmitx", fields)
        // if (childCallbackFetcher) (
        //     childCallbackFetcher(testFunc)
        // )
    }, [parentInvoke])

    const testFunc = () => {
        return handleOnSubmit(null, (fields) => {
            return "success"
            // if (mode == "edit")
            //     handleUpdate(fields)
            // else {
            //     handleSubmit()
            // }
        }, mode == "add" ? "createPalletDetail" : "editPalletDetail")
    }


    const fieldList = getFieldList(fieldConfig, handleChangeFormData, errors, palletString, handleValidation, fields, palletDetailData, mode, cloudFrontURL, schema)
    console.log("pallet form props", props, accessToken)

    return (
        <Block
            // onMouseMove={() => {
            //     setFocus(true)
            // }}
            // onMouseLeave={() => {
            //     setFocus(false)
            // }}

            className={`flex flex-col justify-around md:p-20 xs:p-5 ${focus ? " rounded-sm shadow-[0_0_0_3px_rgba(0,0,0,0.5)]" : ""}`}
        >

            {!focus && <Block className=" inline-block">
                {/* {fieldList[0]} */}
                <Grid container spacing={4}>
                    {fieldList[0]}
                </Grid>

            </Block>}
            {focus && <Grid container spacing={4}>
                {fieldList}
            </Grid>}

            {focus && < Block className="flex justify-end">
                <BasicButton className="mt-10 mr-3 w-32" color="error" onClick={(e) => {
                    if (mode == "edit") {
                        dispatch({
                            type: 'showPopup',
                            payload: {
                                popup: true,
                                popupType: 'confirmProceed',
                                isGlobal: false,
                            },
                        })
                    } else {
                        handleChildChange(index, null, true)
                    }

                    // testFunc()

                    // handleOnSubmit(e, (fields) => {
                    //     // if (mode == "edit")
                    //     //     handleUpdate(fields)
                    //     // else {
                    //     //     handleSubmit()
                    //     // }
                    // }, mode == "editPalletDetail")
                }}><Delete /></BasicButton>
                {/* <BasicButton className="mt-10 ml-3 w-32" onClick={(e) => {
                    router.back()
                }}>{generalString.back}</BasicButton> */}
            </Block>}
            <Block className="py-2">
                <BasicButton onClick={() => {
                    setFocus(!focus)
                }}>{focus ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</BasicButton>
            </Block>
            <BasicSnackBar {...snackBarProps} />
            <Popup type="local" propsToPopup={{ proceedFunc: async () => { await handleChildChange(index, null, true) }, title: palletString.deleteFromPopupTitle, message: palletString.deleteProductPopupMessage }} />
        </Block>
    )
}

export default withCookies(PalletDetailForm)