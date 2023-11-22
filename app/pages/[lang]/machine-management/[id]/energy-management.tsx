import axios from "axios"
import BasicButton from "components/Button/BasicButton"
import get from 'lodash/get'
import Block from 'components/Common/Element/Block'
import { CustomRequest, internalAPICallHandler } from "lib/api/handler"
import { CustomCtx, preprocessServerSideProps } from "lib/serverside-prepro"
import { useCallback, useEffect, useState } from "react"
import { withCookies } from "react-cookie"
import { useStore } from 'store'
import io, { Socket } from 'socket.io-client'
import { machineContent } from "data/machine"
import Popup from "components/Popup"
import { Prisma } from "@prisma/client"
import { serialize, stringify } from "superjson"
import { SnackBarProps } from "components/snackbar"
import { AlertColor } from "@mui/material"
import { palletContent } from "data/pallet"
import { useRouter } from "next/router"
import StyledH1 from "components/Common/Element/H1"

function EnergyManagementPage(props) {
    const { machineData } = props
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
    const [energymanagementStage, setEnergyManagementStage] = useState(0)
    const [popupData, setPopupData] = useState([])

    const [snackBarProps, setSnackbarProps] = useState<SnackBarProps>({
        open: false,
        handleClose: () => {
        },
        message: "",
        severity: 'success'
    })
    const handleSetHandleBarProps = useCallback((open: boolean, handleClose?: () => void, message?: String, severity?: AlertColor) => {
        setSnackbarProps({
            open: open,
            handleClose: handleClose,
            message: message,
            severity: severity
        })
    }, [])
    useEffect(() => {
        socketHandler();

        const exitingFunction = async () => {
            console.log("leaving Page...");
            if (energymanagementStage == 1) {
                await axios.post(`/api/socketio/${machineData.machineDisplayID}/end-energymanagement`, {
                    payload: {
                        foo: "bar"
                    }
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }).catch((e) => {
                    console.log("connection timeout");
                })
            }

        };

        router.events.on("routeChangeStart", exitingFunction);

        return () => {
            console.log("unmounting component...");
            router.events.off("routeChangeStart", exitingFunction);
        };
    }, [])

    const socketHandler = async () => {
        console.log('socketInitializer')
        // await fetch('/api/socketio/init');
        socket = io({
            query: {
                client: "local"
            },
        })

        socket.on("connect", () => {
            console.log("local connected", socket);
            console.log('socketInitializer', socket, socket.connected)

        })



        socket.on("local-energymanagement", async response => {
            const { data } = response
            console.log('later2', response);
            setEnergyManagementStage(2)
            setPopupData(data)
            dispatch({
                type: 'showPopup',
                payload: {
                    popup: true,
                    popupType: 'confirmEndEnergyManagement',
                    isGlobal: false,
                },
            })
        })
    }




    console.log("EnergyManagement props", props, accessToken)
    return (
        <Block>
            <StyledH1 className={`text-white ${lang == 'en' ? 'font-jost' : 'font-notoSansTC'}`} color="white"
            >
                {pageName}
            </StyledH1>

            <Popup type="local" propsToPopup={{
                proceedFunc: (data) => {


                }, title: machineString.machineFormPopupTitle, message: machineString.machineFormPopupMessage, popupData: popupData
            }} />
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
    const collection = 'machine'
    var getMachine: CustomRequest = {
        query: {
            collection,
            where: {
                machineDisplayID: id
            },
            // include: {
            //     energymanagement: true,
            // },
            isUnique: true
        },
        method: ctx.req.method,
    }


    const machineData = await internalAPICallHandler(getMachine).then((data) => {
        console.log("result xdd", data.result)
        return data.result.json
    }).catch((e) => {
        console.log("error getserversideProps", e)
    })

    console.log("ctx result", machineData, getMachine)



    return {
        props: {
            machineData,
            collection,
            user,
            systemConstant
        },
    }
}

export default withCookies(EnergyManagementPage)