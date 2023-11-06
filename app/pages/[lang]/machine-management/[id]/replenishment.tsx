import axios from "axios"
import BasicButton from "components/Button/BasicButton"
import Block from 'components/Common/Element/Block'
import { CustomRequest, internalAPICallHandler } from "lib/api/handler"
import { CustomCtx, preprocessServerSideProps } from "lib/serverside-prepro"
import { convertObjDecimalToNum } from "lib/superjson"
import { withCookies } from "react-cookie"
import { useStore } from 'store'
import { deserialize } from "v8"

function ReplenishmentPage(props) {
    const { machineData } = props
    const {
        state: {
            site: { lang, systemConstant: { cloudFrontURL, schema } },
            user: { accessToken }
        },
        dispatch
    } = useStore()
    console.log("Replenishment props", props)
    return (
        <Block>
            <BasicButton
                onClick={() => {
                    axios.post(`/api/socketio/${machineData.machineDisplayID}/unlock`, {
                        payload: {
                            foo: "bar"
                        }
                    }, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    })
                }}>unlock</BasicButton>
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

export default withCookies(ReplenishmentPage)