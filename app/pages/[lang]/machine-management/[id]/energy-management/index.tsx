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
import StyledBody1 from "components/Common/Element/body1"

const EnergyManagementPage = (props) => {
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

    }, [])

    const list = Object.keys(machineString.energyManagement)?.map((key) => {
        const item = machineString.energyManagement[key]
        return <Block className="flex-1 flex flex-col items-center">
            <BasicButton onClick={async () => {
                if (item.url) {
                    router.push({ pathname: `${router.asPath}/${item.url}` }, `${router.asPath}/${item.as}`)
                    // router.push(`${router.asPath}/${item.url}`)
                }
            }}>{item.icon}</BasicButton>
            <StyledBody1 className="text-center">{item.name}</StyledBody1>
        </Block>
    })


    console.log("EnergyManagement props", props, accessToken)
    return (
        <Block>
            <StyledH1 className={`text-white ${lang == 'en' ? 'font-jost' : 'font-notoSansTC'}`} color="white"
            >
                {pageName}
            </StyledH1>

            <Block className="flex">
                {list}
            </Block>

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