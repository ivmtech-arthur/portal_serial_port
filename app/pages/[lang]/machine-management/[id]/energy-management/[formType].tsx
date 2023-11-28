import FormHandler from "components/Form"
import Block from 'components/Common/Element/Block'
import { CustomRequest, internalAPICallHandler } from "lib/api/handler"
import { CustomCtx, preprocessServerSideProps } from "lib/serverside-prepro"
import { IOEvent } from "lib/socketIO"
import get from "lodash/get"
import { useStore } from 'store'
import { machineContent } from "data/machine"
import { deserializeObjInit } from "lib/superjson"

const EnergyFormContainer = (props) => {
    const { formType, machineStatus, screenSoundStatus, machineData, temperatureStatus } = props
    console.log("EnergyFormContainer props", props)
    const {
        state: {
            site: { lang, pageName, systemConstant: { cloudFrontURL, schema } },
            user: { accessToken, userProfile }
        },
        dispatch
    } = useStore()
    const machineString = get(machineContent, lang)
    return (
        <Block boxShadow='0px 10px 30px rgba(0, 0, 0, 0.1)' bg='white' borderRadius='32px' mb='30px'>
            <FormHandler
                formType={machineString.formTypeMap[formType]}
                lightData={{
                    on: machineStatus?.switchLED1Status,
                    switchLED1Status: machineStatus?.switchLED1Status,
                    startTime: machineStatus?.lightStartTime,
                    endTime: machineStatus?.lightEndTime
                }} machineData={machineData}
                screenSoundStatus={screenSoundStatus}
                temperatureStatus={temperatureStatus}
            />
        </Block>
    )
}

export async function getServerSideProps(ctx: CustomCtx) {
    const preProps = await preprocessServerSideProps(ctx)
    if (preProps.redirect)
        return preProps

    const { pageName } = ctx.query
    const { profile, token, user, systemConstant } = ctx?.props || {}
    const { formType, id, lang } = ctx.params
    const collection = 'machine'
    const machineString = get(machineContent, lang)


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
        return deserializeObjInit(data.result)
    }).catch((e) => {
        console.log("error getserversideProps", e)
    })
    var machineStatus, screenSoundStatus, temperatureStatus;
    if (formType == "lightControl") {
        machineStatus = await IOEvent(machineData.socketID, "queryDeviceStatus").then((data) => { return data.result })
            .catch((e) => {
                console.log(" IOEvent e: ", e)
            })
    }
    if (formType == "screenSoundControl") {
        screenSoundStatus = await IOEvent(machineData.socketID, "screenSoundControl", [
            {
                action: "getVolume",
            },
            {
                action: "getBrightness",
            },
        ]).then((data) => { return data.result })
            .catch((e) => {
                console.log(" IOEvent e: ", e)
            })
    }
    if (formType == "temperatureControl") {
        temperatureStatus = await IOEvent(machineData.socketID, "controlTemperature", {
            temperatureActionList: machineString.temperatureActionMap.map((item) => {
                return {
                    name: item.name,
                    value: 0
                }
            }),
            readOrWrite: 0,
        }, "0").then((data) => { return data.result })
            .catch((e) => {
                console.log(" IOEvent e: ", e)
            })
    }


    console.log("ctx result", machineData, getMachine)



    return {
        props: {
            machineData,
            machineStatus,
            temperatureStatus,
            screenSoundStatus,
            formType,
            user,
            systemConstant
        },
    }
}

export default EnergyFormContainer