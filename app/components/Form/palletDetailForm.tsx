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
import axios from 'lib/axios'
import { withCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import BasicSnackBar, { SnackBarProps } from 'components/snackbar'
import UploadButton from 'components/Button/UploadButton'
import { palletContent } from 'data/pallet'
import Image from 'next/image'
import StyledSearchField from 'components/TextField/styledSearchField'
import { ChangePalletDetailInput } from 'lib/validations/pallet.schema'
import { Delete, KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material'
import { ChangeProductInput } from 'lib/validations/product.schema'




const getFieldList = (fieldConfig, handleChangeFormData, errors, placeholderMap, handleValidation, fields, data, mode, cloudURL, schema) => {
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
    const handleSetHandleBarProps = useCallback((open: boolean, handleClose: () => void, message: String, severity: AlertColor) => {
        setSnackbarProps({
            open: open,
            handleClose: handleClose,
            message: message,
            severity: severity
        })
    }, [])


    const handleChangeFormData = (field, value, deleteArrayIndex) => {
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
                // console.log("handleChangeFormData", field, value, matchProduct, masterProductData, tempFormData, obj)

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

    useEffect(() => {
        if (getInitFields)
            getInitFields(initFields)
    }, [])
    useEffect(() => {
        if (parentInvoke && setChildResult)
            setChildResult(handleSubmit())
    }, [parentInvoke])

    const handleSubmit = () => {
        return handleOnSubmit(null, (fields) => {
            return "success"
        }, mode == "add" ? "createPalletDetail" : "editPalletDetail")
    }


    const fieldList = getFieldList(fieldConfig, handleChangeFormData, errors, palletString, handleValidation, fields, palletDetailData, mode, cloudFrontURL, schema)
    // console.log("pallet form props", props)

    return (
        <Block
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
                }}><Delete /></BasicButton>
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