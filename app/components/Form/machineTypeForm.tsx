import Block from 'components/Common/Element/Block'
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
import { ChangeMachineInput, CreateMachineInput, CreateMachineTypeInput } from 'lib/validations/machine.schema'
import UploadButton from 'components/Button/UploadButton'
import { machineContent } from 'data/machine'
import { handleDeleteS3 } from 'lib/helper'
import Image from 'next/image'
import StyledSearchField from 'components/TextField/styledSearchField'




const getFieldList = (fieldConfig, handleChangeFormData, errors, placeholderMap, handleValidation, fields, data, mode, cloudURL, schema) => {
    var result = []
    for (const key in fieldConfig) {
        var options = []
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
                options = fieldConfig[key].options
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
                break;
            case "textSearch":
                options = fieldConfig[key].options
                result.push(
                    <Grid item xs={12} md={6}>
                        <StyledSearchField
                            id={key}
                            name={key}
                            error={errors[key]}
                            value={fields[key]}
                            options={options}
                            onChange={(e) => {
                                handleChangeFormData(key, e.target.value)
                                console.log("onChange2", e.target.value)
                            }}
                        />
                    </Grid>
                )

        }
    }

    return result
}

const MachineTypeForm = (props) => {
    const { getInitFields, handleOnSubmit, handleValidation, errors, parentCallback, fields, clientUserData, mode = "view", machineTypeData } = props


    const initFields: CreateMachineTypeInput = mode == "add" ? {
        machineTypeName: "",
        machineTypeNameEn: "",
    } : {
        machineTypeName: machineTypeData.machineName,
        machineTypeNameEn: machineTypeData.machineNameEn,
    }

    const fieldConfig = {
        ...(mode != "add" && {
            machineDisplayID: {
                type: "textField",
                disabled: true,
            }
        }),
        machineTypeName: {
            type: "textField",
        },
        machineTypeNameEn: {
            type: "textField",
        },
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
    const machineString = get(machineContent, lang)
    const router = useRouter()
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

            let data: Prisma.MachineUpdateInput = {
                ...(attachment && {
                    attachment: {
                        update: {
                            type: attachment.type.split('/')[0],
                            name: attachment.name,
                            tableName: "machineType"
                        }

                    }
                }),
                ...updateFields
            }
            const result = await axios.put(`/api/prisma/machineType/${machineTypeData.machineID}`, { data, select }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(async ({ data }) => {
                const { result } = data
                let attachmentRecord = result.attachment
                await handleDeleteS3(fields.currentAttachment, token).catch((e) => { throw (e) })
                await handleUpdateS3(attachment, attachmentRecord, token)
                handleSetHandleBarProps(true, () => { router.reload() }, machineString.editmachineSnackBar, "success")
                return result
            }).catch((e) => {
                console.log("axios req error", e)
                handleSetHandleBarProps(true, () => { }, `${e}`, "error")
            })
        } else if (mode == "add") {
            let data: Prisma.MachineTypeCreateInput = {
                // ...(attachment && {
                //     attachment: {
                //         create: {
                //             type: attachment.type.split('/')[0],
                //             name: attachment.name,
                //             tableName: "machine"
                //         }

                //     }
                // }),
                ...fields
            }
            let result = await axios.post(`/api/prisma/machineType`, { data }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(async ({ data }) => {
                    // const { result } = data
                    // let attachmentRecord = result.attachment
                    // if (result.attachment) {
                    //     await handleUpdateS3(attachment, attachmentRecord, token)
                    // }
                    handleSetHandleBarProps(true, () => { router.push(`${lang}/machine-management/machine-Type`) }, machineString.editMachineTypeSnackBar, "success")
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

    const fieldList = getFieldList(fieldConfig, handleChangeFormData, errors, machineString, handleValidation, fields, machineTypeData, mode, cloudFrontURL, schema)
    console.log("machine Type form props", props)

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
                    }, "")
                }}>{generalString.confirm}</BasicButton>
                <BasicButton className="mt-10 ml-3 w-32" onClick={(e) => {
                    router.back()
                }}>{generalString.back}</BasicButton>
            </Block>
            <BasicSnackBar {...snackBarProps} />
            <Popup type="local" propsToPopup={{ proceedFunc: async () => { await handleSubmit() }, title: machineString.machineFormPopupTitle, message: machineString.machineFormPopupMessage }} />
        </Block>
    )
}

export default withCookies(MachineTypeForm)