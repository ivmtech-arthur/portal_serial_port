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
const { publicRuntimeConfig } = getConfig()
const { API_URL, APP_URL } = publicRuntimeConfig


const AccountList = (props) => {
    const { cookies, profile,data,columnMap, collection } = props
    const token = cookies.get("userToken")
    const role = cookies.get("userRole")

    const {
        state: {
            site: { lang, pageName },
            user: { userProfile }
        },
        dispatch,
    } = useStore()
    console.log("accountList props", props, pageName, lang, data, columnMap, role )
    const [editState, setEditState] = useState({})
    const [serverErrorMessage, setServerErrorMessage] = useState(null)
    const router = useRouter()

    return (
        <Block>
            <StyledH1 className={`text-white ${lang == 'en' ? 'font-jost' : 'font-notoSansTC'}`} color="white"
            // fontFamily={lang == "tc" ? "notoSansTc" : "jost"}
            >
                {pageName}
            </StyledH1>

            <Block boxShadow='0px 10px 30px rgba(0, 0, 0, 0.1)' borderRadius='32px' mb='30px'>
                <ExpandableRowTable
                    dataObjList={mapDataByCol(data, columnMap, role,false)}
                    mobileDataObjList={mapDataByCol(data, columnMap, role,true)}
                    columnsFromParent={columnMap}
                />
            </Block>
            {/* <Popup type="local" propsToPopup={{ editState: editState, physioData: props.physioData, subscriptionData: props.subscriptionData, profile: profile, serverErrorMessage: serverErrorMessage }} /> */}
        </Block>
    )
}

export async function getServerSideProps(ctx: CustomCtx) {
    const preProps = await preprocessServerSideProps(ctx)
    if (preProps.redirect)
        return preProps

    console.log("ctx is", ctx.params)
    const { pageName } = ctx.query
    const { profile, token, siteConfig } = ctx?.props || {}
    const { slug, lang } = ctx.params
    const collection = 'user'
    const userType = profile?.userType
    const columnMap = [
        {
            name: "userID",
            mobileDisplay: true,
            mobileCollapse: true,
            objPath: "userID",
        },
        {
            name: "name",
            mobileCollapse: true,
            objPath: "name",
        },
        {
            name: "nameEn",
            mobileCollapse: true,
            objPath: "nameEn",
        },
        {
            name: "authenticated",
            mobileCollapse: true,
            objPath: "authenticated",
        },
        {
            name: "userRole",
            mobileCollapse: false,
            objPath: "userRole.userRoleName",
        },
        {
            name: "userType",
            mobileCollapse: false,
            objPath: "userType.userTypeName",
        },
        {
            name: "createdAt",
            mobileCollapse: false,
            objPath: "createdAt",
        },
        {
            name: "updatedAt",
            mobileCollapse: false,
            objPath: "updatedAt",
        },
    ]
    var customRequest: CustomRequest = {
        query: {
            collection,
            include: {
                userType: true,
                userRole: true
            },
        },
        method: ctx.req.method,
    }


    const data = await internalAPICallHandler(customRequest).then((data) => {
        return JSON.parse(JSON.stringify(data.result))
    }).catch((e) => {
        console.log("error getserversideProps", e)
    })

    console.log("getServersideProps ctx", data)

    return {
        props: {
            // contentData,
            columnMap,
            data: data,
            // physioData,
            // subscriptionData,
            headerTheme: 'white',
            headerPosition: 'fixed',
            collection,
            // pageName: "account Management"
            // profile,
            // siteConfig
        },
    }
}

export default withCookies(AccountList)