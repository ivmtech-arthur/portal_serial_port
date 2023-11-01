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
const { publicRuntimeConfig } = getConfig()


const MachineAdd = (props) => {
    const { cookies, collection } = props
    const token = cookies.get("userToken")
    const role = cookies.get("userRole")
    const {
        state: {
            site: { lang, pageName },
            user: { userProfile }
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
                <FormHandler formType="MachineForm" mode="add" />
            </Block>
            <Popup type="local" />
        </Block>
    )
}

export async function getServerSideProps(ctx: CustomCtx) {
    const preProps = await preprocessServerSideProps(ctx)
    if (preProps.redirect)
        return preProps

    const collection = 'm achine'


    return {
        props: {
            collection,
        },
    }
}

export default withCookies(MachineAdd)