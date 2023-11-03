import { CustomCtx, preprocessServerSideProps } from 'lib/serverside-prepro'
import Block from 'components/Common/Element/Block'
import { useStore } from 'store'
import getConfig from 'next/config'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { withCookies } from 'react-cookie'
import { CustomRequest, internalAPICallHandler } from 'lib/api/handler'
import StyledH1 from 'components/Common/Element/H1'
import FormHandler from 'components/Form'
import superjson, { convertObjDecimalToNum } from 'lib/superjson'
import { deserialize } from 'superjson'
const { publicRuntimeConfig } = getConfig()
const { API_URL, APP_URL } = publicRuntimeConfig


const MachineTypeDetail = (props) => {
    const { cookies, machineTypeData } = props
    const token = cookies.get("accessToken")
    const role = cookies.get("userRole")
    const {
        state: {
            site: { lang, pageName },
            user: { userProfile }
        },
        dispatch,
    } = useStore()
    const router = useRouter()

    return (
        <Block>
            <StyledH1 className={`${lang == 'en' ? 'font-jost' : 'font-notoSansTC'}`} color="white"
            >
                {pageName}
            </StyledH1>

            <Block boxShadow='0px 10px 30px rgba(0, 0, 0, 0.1)' bg='white' borderRadius='32px' mb='30px'>
                <FormHandler formType="machineTypeForm" mode="edit" machineTypeData={machineTypeData} />
            </Block>
            {/* <Popup type="local" /> */}
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
    const collection = 'machineType'
    var getMachineType: CustomRequest = {
        query: {
            collection,
            where: {
                machineTypeDisplayID: id
            },
            isUnique: true
        },
        method: ctx.req.method,
    }


    const machineTypeData = await internalAPICallHandler(getMachineType).then((data) => {
        return convertObjDecimalToNum(deserialize(data.result))
    }).catch((e) => {
        console.log("error getserversideProps", e)
    })



    return {
        props: {
            machineTypeData,
            collection,
            user,
            systemConstant
        },
    }
}

export default withCookies(MachineTypeDetail)