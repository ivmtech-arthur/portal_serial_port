import { CustomCtx, preprocessServerSideProps } from 'lib/serverside-prepro'
import Block from 'components/Common/Element/Block'
import { useStore } from 'store'
import find from 'lodash/find'
import get from 'lodash/get'
import getConfig from 'next/config'
import Popup from 'components/Popup'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { IconButton, Icon } from "@mui/material";
import { withCookies } from 'react-cookie'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { CustomRequest, internalAPICallHandler } from 'lib/api/handler'
import ExpandableRowTable from 'components/Table/expandableTable'
import StyledH1 from 'components/Common/Element/H1'
import { mapDataByCol } from 'lib/helper'
import FormHandler from 'components/Form'
import { getRecordFromDisplayID } from 'lib/prisma'
const { publicRuntimeConfig } = getConfig()
const { API_URL, APP_URL } = publicRuntimeConfig


const AccountDetail = (props) => {
    const { cookies, userTypeData, userRoleData, userData,collection } = props
    const token = cookies.get("accessToken")
    const role = cookies.get("userRole")
    const {
        state: {
            site: { lang, pageName },
            user: { userProfile }
        },
        dispatch,
    } = useStore()
    // console.log("accountList props", props, pageName, lang)
    const [editState, setEditState] = useState({})
    const [filter, setFilter] = useState([])
    const [selectedField, setSelectedField] = useState('id')
    const [record, setRecord] = useState({})
    const [serverErrorMessage, setServerErrorMessage] = useState(null)
    const router = useRouter()

    return (
        <Block>
            <StyledH1 className={`text-green ${lang == 'en' ? 'font-jost' : 'font-notoSansTC'}`} color="white"
            >
                {pageName}
            </StyledH1>

            <Block boxShadow='0px 10px 30px rgba(0, 0, 0, 0.1)' bg='white' borderRadius='32px' mb='30px'>
                <FormHandler formType="AccountForm" userTypeData={userTypeData} userRoleData={userRoleData} mode="edit" userData={userData[0]} />
            </Block>
            {/* <Popup type="local" /> */}
        </Block>
    )
}

export async function getServerSideProps(ctx: CustomCtx) {
    const preProps = await preprocessServerSideProps(ctx)
    if (preProps.redirect)
        return preProps
console.log("ctx is",ctx.props,ctx.params,ctx.query)
    const { pageName } = ctx.query
    const { profile, token, siteConfig } = ctx?.props || {}
    const { slug, lang,id } = ctx.params
    const collection = 'user'
    // const a = await getRecordFromDisplayID(id,collection)
    var getUser: CustomRequest = {
        query: {
            collection: "user",
            where: {
                // userID: a.userID
                userDisplayID: id
            },
            select: {
                userDisplayID: true,
                userID: true,
                username: true,
                name: true,
                nameEn: true,
                userType: true,
                userRole: true
            }
        },
        method: ctx.req.method,
    }

    var getUserRole: CustomRequest = {
        query: {
            collection: "userRole",
        },
        method: ctx.req.method,
    }

    var getUserType: CustomRequest = {
        query: {
            collection: "userType",
        },
        method: ctx.req.method,
    }

    const userData = await internalAPICallHandler(getUser).then((data) => {
        return JSON.parse(JSON.stringify(data.result))
    }).catch((e) => {
        console.log("error getserversideProps", e)
    })


    const userRoleData = await internalAPICallHandler(getUserRole).then((data) => {
        return JSON.parse(JSON.stringify(data.result))
    }).catch((e) => {
        console.log("error getserversideProps", e)
    })


    const userTypeData = await internalAPICallHandler(getUserType).then((data) => {
        return JSON.parse(JSON.stringify(data.result))
    }).catch((e) => {
        console.log("error getserversideProps", e)
    })

    return {
        props: {
            userData,
            userRoleData,
            userTypeData,
            collection,
        },
    }
}

export default withCookies(AccountDetail)