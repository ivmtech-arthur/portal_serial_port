
import BasicButton from "components/Button/BasicButton"
import get from 'lodash/get'
import Block from 'components/Common/Element/Block'
import { CustomRequest, internalAPICallHandler } from "lib/api/handler"
import { CustomCtx, preprocessServerSideProps } from "lib/serverside-prepro"
import { useCallback, useEffect, useState } from "react"
import { withCookies } from "react-cookie"
import { useStore } from 'store'
import io, { Socket } from 'socket.io-client'
import { IOEvent, socketIOActionMap } from "lib/socketIO"
import { machineContent } from "data/machine"
import Popup from "components/Popup"
import { Prisma } from "@prisma/client"
import { deserialize, parse, serialize, stringify } from "superjson"
import BasicSnackBar, { SnackBarProps } from "components/snackbar"
import { AlertColor } from "@mui/material"
import { palletContent } from "data/pallet"
import { useRouter } from "next/router"
import { mapDataByCol } from "lib/helper"
import StyledH1 from "components/Common/Element/H1"
import ExpandableRowTable from "components/Table/expandableTable"
import { deserializeListInit, deserializeObjInit } from "lib/superjson"
import Image from "next/image"
import { Adjust, TripOrigin } from "@mui/icons-material"
import { default as axios } from 'lib/axios'

function PeelingPage(props) {
    const { cookies, machineData, machinePalletDetailListData, collection, weightResult } = props

    const columnMap = [
        {
            name: "palletDetailID",
            desktopIgnore: true,
            objPath: "palletDetailID",
        },
        //refer here
        {
            name: "palletID",
            mobileDisplay: true,
            mobileCollapse: true,
            objPath: "palletID",
        },
        {
            name: "productName",
            // mobileDisplay: true,
            mobileCollapse: true,
            objPath: "masterProduct.productName"
        },
        {
            name: "acturalWeight",
            // mobileDisplay: true,
            mobileCollapse: true,
            yieldFunction: (data, index) => {
                console.log("mapItem weightResult", data, index, weightResult)
                return weightResult[data.palletID - 1]
            }
        },
        {
            name: "expectedWeight",
            // mobileDisplay: true,
            mobileCollapse: true,
            yieldFunction: (data) => {
                return data.inventory * data.weightPerUnit
            }
        },
        {
            name: "Attachment",
            // mobileDisplay: true,
            mobileCollapse: true,
            yieldFunction: (data, index) => {
                return <Image
                    src={`https://${cloudFrontURL}/${schema}/image/${collection}/${data.attachment?.attachmentDisplayID}/${data.attachment?.name}`}
                    // layout="fill"
                    width="100%"
                    height="100%"
                />
            }
        }
    ]
    const role = cookies.get("userRole")

    let socket: Socket;
    const {
        state: {
            site: { lang, pageName, systemConstant: { cloudFrontURL, schema } },
            user: { accessToken, userProfile }
        },
        dispatch
    } = useStore()
    const machineString = get(machineContent, lang)
    const palletString = get(palletContent, lang)
    const router = useRouter()
    const [replenishmentStage, setReplenishmentStage] = useState(0)
    const [popupData, setPopupData] = useState([])
    const [action, setAction] = useState("")
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

    const handlePeeling = async (data) => {
        const palletIDIndex = columnMap.findIndex((item) => { return item.name == "palletID" })
        console.log("handlePeeling", data, palletIDIndex)
        await axios.post(`/api/socketio/${machineData.machineDisplayID}/peeling`, {
            payload: {
                palletID: data[palletIDIndex]
            },
            // emitOnly: true,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then((result) => {
            handleSetHandleBarProps(true, () => { router.push(router.asPath.replace('/peeling', '')) }, machineString.peelingSnackbar, "success")
        }).catch(e => {
            handleSetHandleBarProps(true, () => { }, `${e}`, "error")
        })

    }

    const handleCalibration = async (data) => {
        const palletIDIndex = columnMap.findIndex((item) => { return item.name == "palletID" })
        console.log("handleCalibration", data, palletIDIndex)
        await axios.post(`/api/socketio/${machineData.machineDisplayID}/calibration`, {
            payload: {
                palletID: data[palletIDIndex],
                weight: data.calibrationWeight
            },
            // emitOnly: true,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then((result) => {
            handleSetHandleBarProps(true, () => { router.push(router.asPath.replace('/peeling', '')) }, machineString.calibrationSnackbar, "success")
        }).catch(e => {
            handleSetHandleBarProps(true, () => { }, `${e}`, "error")
        })
    }

    return (
        <Block>
            <StyledH1 className={`text-white ${lang == 'en' ? 'font-jost' : 'font-notoSansTC'}`} color="white"
            >
                {pageName}
            </StyledH1>

            <Block boxShadow='0px 10px 30px rgba(0, 0, 0, 0.1)' borderRadius='32px' mb='30px'>
                {weightResult && <ExpandableRowTable
                    dataObjList={mapDataByCol(machinePalletDetailListData, columnMap, role, false, false, false)}
                    mobileDataObjList={mapDataByCol(machinePalletDetailListData, columnMap, role, true, false, false)}
                    columnsFromParent={columnMap}
                    popupTitle={machineString.deleteFromPopupTitle}
                    title={pageName}
                    message={machineString.deletemachinePopupMessage}
                    customButtonList={[
                        {
                            name: "peeling",
                            Button: (props) => {
                                return <BasicButton {...props}>
                                    <Adjust />
                                </BasicButton>
                            },
                            onClick: (index) => {
                                setAction("peeling")
                                dispatch({
                                    type: 'showPopup',
                                    payload: {
                                        popup: true,
                                        popupType: 'peeling',
                                        isGlobal: false,
                                    },
                                })
                            }
                        },
                        {
                            name: "calibration",
                            Button: (props) => {
                                return <BasicButton {...props}>
                                    <TripOrigin />
                                </BasicButton>
                            },
                            onClick: (index) => {
                                setAction("calibration")
                                dispatch({
                                    type: 'showPopup',
                                    payload: {
                                        popup: true,
                                        popupType: 'calibration',
                                        isGlobal: false,
                                    },
                                })
                            }
                        }
                    ]}
                    proceedFunc={async (data) => {
                        switch (action) {
                            case "peeling":
                                handlePeeling(data);
                                break
                            case "calibration":
                                handleCalibration(data);
                                break
                        }
                    }}
                // handleDelete={(data) => {
                //     handleDelete(data)
                // }}
                // handleClickAdd={() => {
                //     router.push(`/${lang}/machine-management/add`)
                // }}
                />}
                {!weightResult &&
                    <Block className="bg-white h-screen m-auto flex items-center justify-center">
                        <StyledH1>{palletString.noConnection}</StyledH1>
                    </Block>
                }
            </Block>
            <BasicSnackBar {...snackBarProps} />
            {/* <Popup type="local" propsToPopup={{
                proceedFunc: async () => {
                    switch (action) {
                        case "peeling":

                            break
                        case "calibration":
                            break
                    }
                }
            }} /> */}
        </Block>
    )
}

export async function getServerSideProps(ctx: CustomCtx) {
    const preProps = await preprocessServerSideProps(ctx)
    if (preProps.redirect)
        return preProps

    const { pageName } = ctx.query
    const { profile, token, user, systemConstant } = ctx?.props || {}
    const { slug, lang, id } = ctx.params
    const { cloudFrontURL, schema } = systemConstant
    const collection = 'machinePalletDetail'


    // const a: Prisma.MachinePalletDetailWhereInput = {
    //     machine: {
    //         machineDisplayID: id
    //     }
    // }
    var getMachinePalletDetails: CustomRequest = {
        query: {
            collection,
            where: {
                machine: {
                    machineDisplayID: id
                }
            },
            include: {
                masterProduct: true,
                attachment: true,
            },
        },
        method: ctx.req.method,
    }



    var getMachine: CustomRequest = {
        query: {
            collection: "machine",
            where: {
                machineDisplayID: id
            },
            include: {
                replenishment: true,
            },
            isUnique: true
        },
        method: ctx.req.method,
    }

    const machineData = await internalAPICallHandler(getMachine).then((data) => {
        console.log("result xdd", data.result)
        return deserializeObjInit(data.result)
    }).catch((e) => {
        console.log("error getserversideProps", e)
    })


    const machinePalletDetailListData = await internalAPICallHandler(getMachinePalletDetails).then((data) => {
        console.log("result xdd", data.result)
        return deserializeListInit(data.result)
    }).catch((e) => {
        console.log("error getserversideProps", e)
    })
    let weightResult;
    try {
        weightResult = await IOEvent(machineData.socketID, "getWeights").then((data) => { return data.result })
            .catch((e) => {
                console.log(" IOEvent e: ", e)
            })
        console.log("weightResult getserversideProps", weightResult)
    } catch (e) {
        console.log(" IOEvent e: ", e)
    }


    return {
        props: {
            machinePalletDetailListData,
            machineData,
            collection,
            user,
            weightResult,
            systemConstant
        },
    }
}

export default withCookies(PeelingPage)