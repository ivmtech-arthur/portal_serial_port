import { CustomCtx, preprocessServerSideProps } from 'lib/serverside-prepro'
import Block from 'components/Common/Element/Block'
import listMachine from "data/machine"
import StyledTextFieldSearch from 'components/TextField/styledTextFieldSearch'
import Table1 from 'components/Table/table1'
import { useStore } from 'store'
import find from 'lodash/find'
import get from 'lodash/get'
import getConfig from 'next/config'
import Popup from 'components/Popup'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import SvgIconDeleteGrey from 'public/svg/icon_delete_grey.svg'
import SvgIconDeleteBlack from 'public/svg/icon_delete_black.svg'
import SvgIconEditGrey from 'public/svg/icon_edit_grey.svg'
import SvgIconEditBlack from 'public/svg/icon_edit_black.svg'
import SvgIconMore from 'public/svg/icon_more_arrow_black.svg'
import { IconButton, Icon } from "@mui/material";
// import {StyledSelectField} from 'components/TextField/styledSelectField'
import StyledSelectField from 'components/TextField/styledSelectField'
import { withCookies } from 'react-cookie'
import { type } from 'os'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { CustomRequest, internalAPICallHandler } from 'lib/api/handler'
import ExpandableRowTable from 'components/Table/expandableTable'
import StyledH1 from 'components/Common/Element/H1'
import { mapDataByCol } from 'lib/helper'
const { publicRuntimeConfig } = getConfig()
const { API_URL, APP_URL } = publicRuntimeConfig

const MachineList = (props) => {
    const { cookies, profile, data, columnMap, collection } = props
    const token = cookies.get("userToken")
    const role = cookies.get("userRole")
    const {
        state: {
            site: { lang, pageName },
            user: { userProfile }
        },
        dispatch,
    } = useStore()
    console.log("MachineList props", props, pageName, lang)
    const listMachineString = get(listMachine, lang)

    return (
        <Block>
            <StyledH1 className=" text-white font-jost" color="white"
            // fontFamily={lang == "tc" ? "notoSansTc" : "jost"}
            >
                {pageName}
            </StyledH1>
            <Block
                color='midGrey1'
                fontWeight={{ _: 500, md: 700 }}
                fontSize={{ _: '24px', md: '30px' }}
                lineHeight={{ _: '29px', md: '36px' }}
                pt={{ md: '40px' }}
            >
                {listMachineString.hello}
            </Block>
            <Block
                color='darkGrey1'
                fontWeight={{ _: 700, md: 600 }}
                fontSize={{ _: '30px', md: '48px' }}
                lineHeight={{ _: '36px', md: '58px' }}
            >{profile && profile.username}</Block>

            <IconButton color="primary" aria-label="add to shopping cart">
                {/* <AddShoppingCartIcon /> */}
            </IconButton>

            <Block boxShadow='0px 10p   x 30px rgba(0, 0, 0, 0.1)' borderRadius='32px' mb='30px'>
                <ExpandableRowTable
                    dataObjList={mapDataByCol(data, columnMap, role, false)}
                    mobileDataObjList={mapDataByCol(data, columnMap, role, true)}
                    columnsFromParent={columnMap}
                />
            </Block>
            <Popup type="local" propsToPopup={{ data: data }} />
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
    const collection = 'machine'
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

        },
        method: ctx.req.method,
    }


    const data = await internalAPICallHandler(customRequest).then((data) => {
        return data
    }).catch((e) => {
        console.log("error getserversideProps", e)
    })

    console.log("getServersideProps ctx", data)

    return {
        props: {
            data,
            headerTheme: 'white',
            headerPosition: 'fixed',
            collection,
        },
    }
}

export default withCookies(MachineList)