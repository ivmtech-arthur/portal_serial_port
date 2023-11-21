import { CircleRounded, Inventory, LockOpen, Settings } from "@mui/icons-material"
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

            }
        }

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

            }
        }

    }
}