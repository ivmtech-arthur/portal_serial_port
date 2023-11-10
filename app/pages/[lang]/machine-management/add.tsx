import { CustomCtx, preprocessServerSideProps } from 'lib/serverside-prepro'
import Block from 'components/Common/Element/Block'
import { useStore } from 'store'
import getConfig from 'next/config'
import Popup from 'components/Popup'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { withCookies } from 'react-cookie'
import { CustomRequest, internalAPICallHandler } from 'lib/api/handler'
import StyledH1 from 'components/Common/Element/H1'
import FormHandler from 'components/Form'
import { Prisma } from '@prisma/client'
import { deserializeListInit } from 'lib/superjson'
const { publicRuntimeConfig } = getConfig()


const MachineAdd = (props) => {
    const { cookies, clientUserData, machineTypeData, collection } = props
    const role = cookies.get("userRole")
    const {
        state: {
            site: { lang, pageName },
            user: { userProfile, accessToken }
        },
        dispatch,
    } = useStore()

    return (
        <Block>
            <StyledH1 className={`text-white ${lang == 'en' ? 'font-jost' : 'font-notoSansTC'}`} color="white"
            >
                {pageName}
            </StyledH1>

            <Block boxShadow='0px 10px 30px rgba(0, 0, 0, 0.1)' bg='white' borderRadius='32px' mb='30px'>
                <FormHandler formType="MachineForm" clientUserData={clientUserData} machineTypeData={machineTypeData} mode="add" />
            </Block>
            <Popup type="local" />
        </Block>
    )
}

export async function getServerSideProps(ctx: CustomCtx) {
    const preProps = await preprocessServerSideProps(ctx)
    if (preProps.redirect)
        return preProps

    const collection = 'machine'

    let a: Prisma.UserWhereInput = {
        userRoleID: 1
    }
    const getClientUser: CustomRequest = {
        query: {
            collection: "user",
            where: {
                userRoleID: 3
            }
        },
        method: "GET"
    }

    const getMachineType: CustomRequest = {
        query: {
            collection: "machineType",

        },
        method: "GET"
    }
    const clientUserData = await internalAPICallHandler(getClientUser).then((data) => {
        return deserializeListInit(data.result)
    }).catch((e) => {
        console.log("error getserversideProps", e)
    })

    const machineTypeData = await internalAPICallHandler(getMachineType).then((data) => {
        return deserializeListInit(data.result)
    }).catch((e) => {
        console.log("error getserversideProps", e)
    })

    return {
        props: {
            clientUserData,
            machineTypeData,
            collection,
        },
    }
}

export default withCookies(MachineAdd)