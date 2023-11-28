import { AcUnit, Battery0Bar, CircleRounded, DeviceThermostat, Inventory, Lightbulb, LockOpen, Settings, VolumeUp } from "@mui/icons-material"
import axios from "axios"

export const machineContent = {
    en: {
        machineDisplayIDPlaceholder: 'Machine ID',
        isActivePlaceHolder: 'IsActive',
        ownerPlaceHolder: 'Owner',
        machineNamePlaceholder: 'Machine Name',
        nameEnPlaceholder: 'Name Eng',
        machineNameEnPlaceholder: 'Machine Name Eng',
        machineTypePlaceholder: 'Machine Type',
        statusPlaceholder: "Status",
        ownerIDPlaceholder: 'Owner ID',
        descPlaceholder: 'Description',
        descEnPlaceholder: 'Description Eng',
        palletNoPlaceholder: 'Pallet No',
        remarkPlaceholder: 'Remark',
        attachmentsPlaceholder: 'Upload Machine Photos',
        clientRefIDPlaceholder: 'Client Reference ID',
        machineFormPopupTitle: 'Confirm',
        machineFormPopupMessage: 'Are you sure to update Machine?',
        editMachineSnackBar: "Updated Machine",
        editMachineTypeSnackBar: "Updated Machine Type",
        createdMachineSnackBar: "Created Machine",
        createdMachineTypeSnackBar: "Created Machine Type",
        deleteFromPopupTitle: 'Action Cannot Reverted',
        deleteMachinePopupMessage: 'Are you sure to delete Machine?',
        deleteMachineSnackbar: 'Deleted Machine',
        // for machine-Type page
        machineTypeNamePlaceholder: 'Machine Type Name',
        machineTypeNameEnPlaceholder: 'Machine Type Name En',
        formTypeMap: {
            "lightControl": "LightControlForm",
            "screenSoundControl": "ScreenSoundControlForm",
            "temperatureControl": "TemperatureControlForm",
        },
        palletConfiguration: {
            replenishment: {
                name: "Replenishment",
                url: "/replenishment",
                icon: <Inventory />,
            },
            palletSetting: {
                name: "Pallet Setting",
                url: '/pallet-config',
                icon: <Settings />,
            },
            peeling: {
                name: "Peeling",
                url: '/peeling',
                icon: <CircleRounded />,
            },
            unlock: {
                name: "unlock",
                action: async ({ id, accessToken }) => {
                    await axios.post(`/api/socketio/${id}/unlock`, {
                        payload: {
                            lockID: 0,
                            seconds: 10,
                        },
                        emitOnly: true,
                    }, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    }).catch(e => {
                        console.log(e)
                    })
                },
                title: "Are you sure to unlock?",
                message: "Remember to close the door after then",
                icon: <LockOpen />,
            }
        },
        salesManagement: {
            salesRecord: {
                // name: "Energy Management",
                // url: '/energy-management',
                icon: <Battery0Bar />,
            },
            energyManagement: {
                name: "Energy Management",
                url: '/energy-management',
                icon: <Battery0Bar />,
            },
        },
        energyManagement: {
            lightControl: {
                name: "Light Control",
                url: '/LightControlForm',
                as: 'lightControl',
                // action: (dispatch) => {
                //     if (dispatch)
                //         dispatch({
                //             type: 'showPopup',
                //             payload: {
                //                 popup: true,
                //                 popupType: 'lightControl',
                //                 isGlobal: false,
                //             },
                //         })
                // },
                icon: <Lightbulb />
            },
            soundControl: {
                name: "Screen & Sound Control",
                url: '/ScreenSoundControlForm',
                as: 'screenSoundControl',
                // action: (dispatch) => {
                //     if (dispatch)
                //         dispatch({
                //             type: 'showPopup',
                //             payload: {
                //                 popup: true,
                //                 popupType: 'soundControl',
                //                 isGlobal: false,
                //             },
                //         })
                // },
                icon: <VolumeUp />
            },
            temperatureControl: {
                name: "Temperature Control",
                url: '/TemperatureControlForm',
                as: 'temperatureControl',
                // action: (dispatch) => {
                //     if (dispatch)
                //         dispatch({
                //             type: 'showPopup',
                //             payload: {
                //                 popup: true,
                //                 popupType: 'temperatureControl',
                //                 isGlobal: false,
                //             },
                //         })
                // },
                icon: <DeviceThermostat />
            },
            glassDefogging: {
                name: "Glass Defogging",
                url: '/GlassHeatControlForm',
                as: 'glassHeatControl',
                // action: (dispatch) => {
                //     if (dispatch)
                //         dispatch({
                //             type: 'showPopup',
                //             payload: {
                //                 popup: true,
                //                 popupType: 'glassDefogging',
                //                 isGlobal: false,
                //             },
                //         })
                // },
                icon: <AcUnit />
            },
        },
        soundControlPlaceholder: "Sound Switch",
        screenControlPlaceholder: "Screen Switch",
        lightControlPlaceholder: "Light Switch",
        lightStatusPlaceholder: "Current Light Status",
        volumeStatusPlaceholder: "Current Sound Value",
        brightnessPlaceholder: "Current Brightness Value",
        temperaturePlaceholder: "Temperature Switch",
        glassHeatPlaceholder: "Glass Heat Switch",
        temperatureActionMap: [
            {
                name: "temperature",
                Unit: "Degree Celsius"
            },
            {
                name: "thrmalHysteresis",
                Unit: "Degree Celsius"
            },
            {
                name: "compressorMinInterval",
                Unit: "Minutes"
            },
            {
                name: "maxStandByTime",
                Unit: "Minutes"
            },
            {
                name: "evaporatorSenosrSwitch",
                Unit: "Boolean"
            },
            {
                name: "defrostPeriod",
                Unit: "hour"
            },
            {
                name: "defrostMaxTime",
                Unit: "Minutes"
            },
            {
                name: "defrostCritTemperature",
                Unit: "Degree Celsius"
            },
            {
                name: "defrostDelayOutputTime",
                Unit: "Minutes"
            },
            {
                name: "palletSensorErrStartRatioFreezeSwitch",
                Unit: "Boolean"
            },
            {
                name: "ratioFreezeStopTime",
                Unit: "Minutes"
            },
            {
                name: "ratioFreezeStartTime",
                Unit: "Minutes"
            },
            {
                name: "evaporatorSensorFaultDefrostTime",
                Unit: "Minutes"
            },
            {
                name: "forceEnterDefrostTime",
                Unit: "Minutes"
            },
            {
                name: "fanStartTemperature",
                Unit: "Degree Celsius"
            },
            {
                name: "forceDefrostUpperTemperature",
                Unit: "Degree Celsius"
            },
            {
                name: "forceDefrostLowerTemperature",
                Unit: "Degree Celsius"
            },
            {
                name: "compressorSwitch",
                Unit: "Boolean"
            },
            {
                name: "compressorFreezeSwitch",
                Unit: "Boolean"
            },
            {
                name: "compressorHeatSwitch",
                Unit: "Boolean"
            },
        ]
    },
    tc: {
        machineDisplayIDPlaceholder: 'Machine ID tc',
        isActivePlaceHolder: 'IsActive tc',
        ownerPlaceHolder: 'Owner tc',
        machineNamePlaceholder: 'Machine Name tc',
        nameEnPlaceholder: 'Name Eng tc',
        machineNameEnPlaceholder: 'Machine Name Eng tc',
        machineTypePlaceholder: 'Machine Type tc',
        statusPlaceholder: "Status tc",
        ownerIDPlaceholder: 'Owner ID tc',
        descPlaceholder: 'Description tc',
        descEnPlaceholder: 'Description Eng tc',
        palletNoPlaceholder: 'Pallet No tc',
        remarkPlaceholder: 'Remark tc',
        attachmentsPlaceholder: 'Upload Machine Photos tc',
        clientRefIDPlaceholder: 'Client Reference ID tc',
        machineFormPopupTitle: 'Confirm tc',
        machineFormPopupMessage: 'Are you sure to update Machine tc?',
        editMachineSnackBar: "Updated Machine tc",
        editMachineTypeSnackBar: "Updated Machine Type tc",
        createdMachineSnackBar: "Created Machine tc",
        createdMachineTypeSnackBar: "Created Machine Type",
        deleteFromPopupTitle: 'Action Cannot Reverted tc',
        deleteMachinePopupMessage: 'Are you sure to delete Machine tc?',
        deleteMachineSnackbar: 'Deleted Machine tc',
        machineTypeNamePlaceholder: 'Machine Type Name tc',
        machineTypeNameEnPlaceholder: 'Machine Type Name En tc',
        formTypeMap: {
            "lightControl": "LightControlForm",
            "screenSoundControl": "ScreenSoundControlForm",
            "temperatureControl": "TemperatureControlForm",
        },
        palletConfiguration: {
            replenishment: {
                name: "Replenishment tc",
                url: "/replenishment",
                icon: <Inventory />,
            },
            palletSetting: {
                name: "Pallet Setting tc",
                url: '/pallet-config',
                icon: <Settings />,
            },
            peeling: {
                name: "Peeling tc",
                url: '/peeling',
                icon: <CircleRounded />,
            },
            unlock: {
                name: "unlock tc",
                action: async ({ id, accessToken }) => {
                    await axios.post(`/api/socketio/${id}/unlock`, {
                        payload: {
                            lockID: 1,
                            seconds: 10,
                        },
                        // emitOnly: true,
                    }, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    }).catch(e => {
                        console.log(e)
                    })
                },
                title: "Are you sure to unlock? tc",
                message: "Remember to close the door after then tc",
                icon: <LockOpen />,
            }
        },
        salesManagement: {
            salesRecord: {
                // name: "Energy Management tc",
                // url: '/energy-management',
                icon: <Battery0Bar />,
            },
            energyManagement: {
                name: "Energy Management tc",
                url: '/energy-management',
                icon: <Battery0Bar />,
            },
        },
        energyManagement: {
            lightControl: {
                name: "Light Control tc",
                url: '/LightControlForm',
                as: 'lightControl',
                // action: (dispatch) => {
                //     if (dispatch)
                //         dispatch({
                //             type: 'showPopup',
                //             payload: {
                //                 popup: true,
                //                 popupType: 'lightControl',
                //                 isGlobal: false,
                //             },
                //         })
                // },
                icon: <Lightbulb />
            },
            soundControl: {
                name: "Screen & Sound Control tc",
                url: '/ScreenSoundControlForm',
                as: 'screenSoundControl',
                // action: (dispatch) => {
                //     if (dispatch)
                //         dispatch({
                //             type: 'showPopup',
                //             payload: {
                //                 popup: true,
                //                 popupType: 'soundControl',
                //                 isGlobal: false,
                //             },
                //         })
                // },
                icon: <VolumeUp />
            },
            temperatureControl: {
                name: "Temperature Control tc",
                url: '/TemperatureControlForm',
                as: 'temperatureControl',
                // action: (dispatch) => {
                //     if (dispatch)
                //         dispatch({
                //             type: 'showPopup',
                //             payload: {
                //                 popup: true,
                //                 popupType: 'temperatureControl',
                //                 isGlobal: false,
                //             },
                //         })
                // },
                icon: <DeviceThermostat />
            },
            glassDefogging: {
                name: "Glass Defogging tc",
                url: '/GlassHeatControlForm',
                as: 'glassHeatControl',
                // action: (dispatch) => {
                //     if (dispatch)
                //         dispatch({
                //             type: 'showPopup',
                //             payload: {
                //                 popup: true,
                //                 popupType: 'glassDefogging',
                //                 isGlobal: false,
                //             },
                //         })
                // },
                icon: <AcUnit />
            },
        },
        soundControlPlaceholder: "Sound Switch tc",
        screenControlPlaceholder: "Screen Switch tc",
        lightControlPlaceholder: "Light Switch tc",
        lightStatusPlaceholder: "Current Light Status tc",
        volumeStatusPlaceholder: "Current Sound Value tc",
        brightnessPlaceholder: "Current Brightness Value tc",
        temperaturePlaceholder: "Temperature Switch tc",
        glassHeatPlaceholder: "Glass Heat Switch tc",

    }
}