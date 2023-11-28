import { AlertColor, Box, ButtonGroup, Collapse, Grid, TextField } from "@mui/material"
import BasicSwitch from "components/switch"
import { useStore } from 'store'
import get from 'lodash/get'
import { machineContent } from "data/machine"
import { useCallback, useEffect, useState } from "react"
import BasicSlider from "components/slider"
import { Add, Brightness1, Delete, Edit, MoreVert, VolumeUp } from "@mui/icons-material"
import Block from 'components/Common/Element/Block'
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import Popup from "components/Popup"
import BasicButton from "components/Button/BasicButton"
import BasicSnackBar, { SnackBarProps } from "components/snackbar"
import general from "data/general"
import { default as axios } from 'lib/axios'
import { useRouter } from "next/router"
import { Mobile } from "aws-sdk"
import SimpleCard from "components/Card/simpleCard"
import StyledH3 from "components/Common/Element/H3"
import moment from 'moment'
import { Prisma } from "@prisma/client"
import { parse, stringify } from "superjson"

function MobileToolbar(props) {
    const { handleClickAdd } = props
    const router = useRouter();

    const [open, setOpen] = useState(false)


    const buttons = [

        <BasicButton key="add" onClick={() => {
            if (handleClickAdd) {
                handleClickAdd()
            }
        }}><Add /></BasicButton>,
    ];

    return (
        <Box
            sx={{
                transformOrigin: '0 100% 0',
                scale: '1.3',
                zIndex: 9999,
                right: 20,
                bottom: 50,
                position: 'fixed',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                    marginX: 1,
                },
            }}
        >
            <Collapse in={open} >
                <ButtonGroup

                    orientation="vertical"
                    aria-label="vertical contained button group"
                    variant="contained"
                >

                    {buttons}
                </ButtonGroup>
            </Collapse>
            <BasicButton
                // size="large"
                onClick={() => {
                    setOpen(!open)
                }}>
                <MoreVert />
            </BasicButton>
        </Box>
    )
}

function ScreenSoundControlListForm(props) {
    const { screenSoundStatus, machineData } = props
    const {
        state: {
            site: { lang, pageName },
            user: { accessToken, userProfile }
        },
        dispatch,
    } = useStore()
    var oldParamsList = get<any[], string>(parse(machineData.config), "screenSoundConfigList")
    const [paramsList, setParamsList] = useState<any[]>(
        oldParamsList ? oldParamsList.map((params) => {
            const { startTime, endTime, ...restParams } = params
            return {
                startTime: dayjs(startTime.join(":"), "HH:mm"),
                endTime: dayjs(endTime.join(":"), "HH:mm"),
                ...restParams,
            }
        }) : [])
    const [popupData, setPopupData] = useState({})
    const [mode, setMode] = useState("")
    const [editIndex, setEditIndex] = useState(0)
    const [snackBarProps, setSnackbarProps] = useState<SnackBarProps>({
        open: false,
        handleClose: () => {
        },
        message: "",
        severity: 'success'
    })

    const router = useRouter()




    const handleSetHandleBarProps = useCallback((open: boolean, handleClose?: () => void, message?: String, severity?: AlertColor) => {
        setSnackbarProps({
            open: open,
            handleClose: handleClose,
            message: message,
            severity: severity
        })
    }, [])

    const handleAdd = (data, callback) => {

        const startTime = moment(data.startTime.format("HH:mm"), 'hh:mm');
        const endTime = moment(data.endTime.format("HH:mm"), 'hh:mm');
        if (paramsList.some((params) => {
            let tempStartTime = moment(params.startTime.format("HH:mm"), 'hh:mm');
            let tempEndTime = moment(params.endTime.format("HH:mm"), 'hh:mm');

            if (tempStartTime.isBetween(startTime, endTime) ||
                tempEndTime.isBetween(startTime, endTime) ||
                startTime.isBetween(tempStartTime, tempEndTime) ||
                endTime.isBetween(tempStartTime, tempEndTime) ||
                tempStartTime.isSame(startTime) ||
                tempEndTime.isSame(endTime)) {
                return true
            } else {
                return false
            }

        })) {
            handleSetHandleBarProps(true, () => {
                handleSetHandleBarProps(false)
            }, "time range overlapped", "error")

        } else {
            paramsList.push(data)
            setParamsList([...paramsList])
            if (callback) {
                callback();
            }
        }
    }

    const handleEdit = (data, callback, outstandingIndex) => {
        console.log("handleEdit", data, callback, outstandingIndex)
        const startTime = moment(data.startTime.format("HH:mm"), 'hh:mm');
        const endTime = moment(data.endTime.format("HH:mm"), 'hh:mm');
        if (paramsList.some((params, index) => {
            let tempStartTime = moment(params.startTime.format("HH:mm"), 'hh:mm');
            let tempEndTime = moment(params.endTime.format("HH:mm"), 'hh:mm');

            if ((outstandingIndex != index) && (tempStartTime.isBetween(startTime, endTime) ||
                tempEndTime.isBetween(startTime, endTime) ||
                startTime.isBetween(tempStartTime, tempEndTime) ||
                endTime.isBetween(tempStartTime, tempEndTime) ||
                tempStartTime.isSame(startTime) ||
                tempEndTime.isSame(endTime))) {
                return true
            } else {
                return false
            }

        })) {
            handleSetHandleBarProps(true, () => {
                handleSetHandleBarProps(false)
            }, "edit time range overlapped", "error")

        } else {
            paramsList[outstandingIndex] = data
            setParamsList([...paramsList])
            if (callback) {
                callback();
            }
        }
    }

    const handleDelete = (index) => {
        paramsList.splice(index, 1)
        setParamsList([...paramsList])
    }

    const handleSubmit = async () => {
        const { config } = machineData
        var oldConfig = config ? parse<any>(config) : {};
        const { screenSoundConfigList, ...restConfig } = oldConfig
        var oldList = screenSoundConfigList
        oldList = paramsList.map((params) => {
            const { startTime, endTime, ...restParams } = params
            return {
                startTime: startTime.format("HH:mm").split(":"),
                endTime: endTime.format("HH:mm").split(":"),
                ...restParams
            }
        });
        let data: Prisma.MachineUpdateInput = {
            config: stringify({
                screenSoundConfigList: oldList,
                ...restConfig,
            })
        }
        await axios.put(`/api/prisma/machine/${machineData.machineID}`, { data }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(async ({ data }) => {
            handleSetHandleBarProps(true, () => { router.reload() }, machineString.editMachineSnackBar, "success")
        }).catch((e) => {
            handleSetHandleBarProps(true, () => { }, `${e}`, "error")
        })
    }

    const generalString = get(general, lang)
    const machineString = get(machineContent, lang)

    const list = paramsList.map((params, index) => {
        return <SimpleCard>
            <Block className="flex p-4 items-center justify-around">
                <StyledH3>
                    {params.startTime.format("HH:mm")}
                </StyledH3>
                <StyledH3>
                    {params.endTime.format("HH:mm")}
                </StyledH3>
                <BasicButton color="success" onClick={() => {
                    setMode("edit")
                    setEditIndex(index)
                    setPopupData(params)
                    dispatch({
                        type: 'showPopup',
                        payload: {
                            popup: true,
                            popupType: 'screenSoundControl',
                            isGlobal: false,
                        },
                    })
                }}>
                    {<Edit />}
                </BasicButton>
                <BasicButton color="error" onClick={() => {
                    setMode("delete")
                    setEditIndex(index)
                    dispatch({
                        type: 'showPopup',
                        payload: {
                            popup: true,
                            popupType: 'confirmProceed',
                            isGlobal: false,
                        },
                    })
                }}>
                    {<Delete />}
                </BasicButton>
            </Block>
        </SimpleCard>
    })
    return (
        <Block className=" p-4">
            <BasicSlider startIcon={<VolumeUp />} disabled value={screenSoundStatus.volume * 100} name={machineString.soundControlPlaceholder} />
            <BasicSlider startIcon={<Brightness1 />} disabled value={screenSoundStatus.brightness * 100} name={machineString.screenControlPlaceholder} />
            {list}
            <BasicButton className="mt-10 mr-3 w-32" onClick={(e) => {
                console.log("params is ", paramsList)
                handleSubmit()
            }}>{generalString.confirm}</BasicButton>

            <BasicSnackBar {...snackBarProps} />
            <MobileToolbar handleClickAdd={() => {
                setMode("add")
                setPopupData({})
                dispatch({
                    type: 'showPopup',
                    payload: {
                        popup: true,
                        popupType: 'screenSoundControl',
                        isGlobal: false,
                    },
                })
            }} />
            <Popup type="local" propsToPopup={{
                proceedFunc: async (data, callback) => {
                    switch (mode) {
                        case "add":
                            await handleAdd(data, callback)
                            break
                        case "edit":
                            await handleEdit(data, callback, editIndex)
                            break;
                        case "delete":
                            handleDelete(editIndex)
                            break
                    }

                }, screenSoundData: popupData, mode: mode
            }} />
        </Block>

    )
}

export default ScreenSoundControlListForm