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
import { ChangeMachineInput, CreateMachineInput } from 'lib/validations/machine.schema'
import UploadButton from 'components/Button/UploadButton'
import { machineContent } from 'data/machine'
import { ExtendFile, handleDeleteS3 } from 'lib/helper'
import Image from 'next/image'
import StyledSearchField from 'components/TextField/styledSearchField'
import { stringify } from 'superjson'




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

const MachineForm = (props) => {
    const { getInitFields, handleOnSubmit, handleValidation, errors, parentCallback, fields, machineTypeData, clientUserData, mode = "view", machineData,setTitle,setMessage,setProceedFunc } = props


    const initFields: ChangeMachineInput = mode == "add" ? {
        machineName: "",
        machineNameEn: "",
        machineType: 0,
        ownerID: 0,
        palletNo: 24,
        // clientRefID: "",
        remark: "",
        attachments: [],
    } : {
        machineName: machineData.machineName,
        machineNameEn: machineData.machineNameEn,
        machineType: machineData.machineType.machineTypeID,
        ownerID: machineData.owner.userID,
        palletNo: machineData.palletNo,
        // clientRefID: machineData.clientRefID,
        remark: machineData.remark,
        attachments: machineData.attachments,
        currentAttachment: machineData.attachment,
    }

    const fieldConfig = {
        ...(mode != "add" && {
            machineDisplayID: {
                type: "textField",
                disabled: true,
            }
        }),
        machineName: {
            type: "textField",
        },
        machineNameEn: {
            type: "textField",
        },
        machineType: {
            type: "textSearch",
            options: machineTypeData.map((data) => {
                return {
                    value: data.machineTypeID,
                    label: data.machineTypeName
                }
            })
        },
        ownerID: {
            type: "textSearch",
            options: clientUserData.map((data) => {
                return {
                    value: data.userID,
                    label: data.name,
                }
            }),
        },
        palletNo: {
            type: "number"
        },
        // clientRefID: {
        //     type: "textField",
        // },
        remark: {
            type: "textArea",
        },
        attachments: {
            type: "upload",
            multiple: true,
            usageMap: [
                "intro",
                "env",
                "qc"
            ]
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

    const handleChangeFormData = (field, value, deleteArrayIndex) => {
        // console.log("handleChangeFormData", field, value, deleteArrayIndex)
        let tempFormData = formData
        switch (field) {
            case "attachments":
                if (deleteArrayIndex) {

                    let tempArr = Object.assign([], tempFormData[field])
                    tempArr.splice(deleteArrayIndex, 1)
                    tempFormData[field].push(null)
                    // tempFormData[field] = [...tempArr]
                    // console.log("handleChangeFormData2", field, value, deleteArrayIndex, tempFormData[field])
                } else {
                    if (tempFormData[field]) {
                        tempFormData[field].push(value)
                    } else {
                        let tempArr = [value]
                        tempFormData[field] = tempArr
                    }

                }

                break
            default:
                tempFormData[field] = value
                break;
        }

        setFormData({ ...tempFormData })
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

            let data: Prisma.MachineUpdateInput = {
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
            const result = await axios.put(`/api/prisma/machine/${machineData.machineID}`, { data }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then(async ({ data }) => {
                const { result } = data
                let attachmentRecord = result.attachment
                await handleDeleteS3(fields.currentAttachment, token).catch((e) => { throw (e) })
                await handleUpdateS3(attachment, attachmentRecord, token)
                handleSetHandleBarProps(true, () => { router.reload() }, machineString.editMachineSnackBar, "success")
                return result
            }).catch((e) => {
                console.log("axios req error", e)
                handleSetHandleBarProps(true, () => { }, `${e}`, "error")
            })
        } else if (mode == "add") {
            console.log("fields", fields)
            const { attachments, ownerID, machineType, ...restFields } = fields
            let resultAttachments: ExtendFile[] = attachments;
            delete fields.attachment
            let select: Prisma.MachineSelect = {
                attachments: true,
                machineDisplayID: true,
                machineID: true,
            }
            let data: Prisma.MachineCreateInput = {
                ...(resultAttachments && {
                    attachments: {
                        create: resultAttachments.map((attachment) => {
                            let input: Prisma.AttachmentCreateWithoutMachineInput = {
                                type: attachment.type.split('/')[0],
                                name: attachment.name,
                                tableName: "machine",
                                tableUsage: attachment.usage
                            }
                            return input
                        })

                    }
                }),
                serverToken: "",
                machineType: {
                    connect: {
                        machineTypeID: machineType
                    }
                },
                status: "created",
                owner: {
                    connect: {
                        userID: ownerID
                    }
                },
                // serverToken: await signServerToken({sub:}),
                ...restFields
            }
            const formData = new FormData()
            // { data, select, files: attachments }
            formData.append("data", stringify(data))
            formData.set("select", stringify(select))
            // formData.set("files", attachments)
            resultAttachments.forEach((attachment) => {
                formData.append("files", attachment)
            })

            let result = await axios.post(`/api/machine/register`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then(async ({ data }) => {
                handleSetHandleBarProps(true, () => { router.push(`/${lang}/machine-management`) }, machineString.editMachineSnackBar, "success")
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

    const fieldList = getFieldList(fieldConfig, handleChangeFormData, errors, machineString, handleValidation, mode == "edit" ? fields : initFields, machineData, mode, cloudFrontURL, schema)
    console.log("machine form props", props)

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
                        if (mode == "edit") {
                            handleUpdate(fields)
                            if (setTitle) setTitle(machineString.machineFormPopupTitle)
                            if (setMessage) setMessage(machineString.machineFormPopupMessage)
                            if (setProceedFunc) setProceedFunc(handleSubmit)
                        }

                        else {
                            handleSubmit()
                        }
                    }, mode == "edit" ? "changeMachine" : "createMachine")
                }}>{generalString.confirm}</BasicButton>
                <BasicButton className="mt-10 ml-3 w-32" onClick={(e) => {
                    router.back()
                }}>{generalString.back}</BasicButton>
            </Block>
            <BasicSnackBar {...snackBarProps} />
            {/* <Popup type="local" propsToPopup={{ proceedFunc: async () => { await handleSubmit() }, title: machineString.machineFormPopupTitle, message: machineString.machineFormPopupMessage }} /> */}
        </Block>
    )
}

export default withCookies(MachineForm)