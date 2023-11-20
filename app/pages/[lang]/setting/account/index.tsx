import { CustomCtx, preprocessServerSideProps } from 'lib/serverside-prepro'
import Block from 'components/Common/Element/Block'
import { useStore } from 'store'
import get from 'lodash/get'
import getConfig from 'next/config'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { withCookies } from 'react-cookie'
import { CustomRequest, internalAPICallHandler } from 'lib/api/handler'
import ExpandableRowTable from 'components/Table/expandableTable'
import StyledH1 from 'components/Common/Element/H1'
import { mapDataByCol } from 'lib/helper'
import { userContent } from 'data/user'
import axios from 'axios'
import BasicSnackBar, { SnackBarProps } from 'components/snackbar'
import { deserialize } from 'superjson'
import { deserializeListInit } from 'lib/superjson'
import Cookies from 'js-cookie'
const { publicRuntimeConfig } = getConfig()


const AccountList = (props) => {
    const { cookies, profile, data, columnMap, collection } = props
    const token = cookies.get("accessToken")
    // const role = cookies.get("userRole")
    const role = Cookies.get("userRole")

    const {
        state: {
            site: { lang, pageName },
            user: { userProfile }
        },
        dispatch,
    } = useStore()

    console.log("accountList props", props, pageName, lang, data, columnMap, role)
    const [snackBarProps, setSnackbarProps] = useState<SnackBarProps>({
        open: false,
        handleClose: () => {
        },
        message: "",
        severity: 'success'
    })
    const userString = get(userContent, lang)
    const router = useRouter()

    const handleDelete = useCallback(
        async (id) => {
            await axios.delete(`/api/prisma/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((data) => {
                console.log("success!!")
                var tempSnackBarProps = snackBarProps
                tempSnackBarProps.open = true
                tempSnackBarProps.severity = "success"
                tempSnackBarProps.handleClose = () => {
                    router.reload()
                }
                tempSnackBarProps.message = userString.deleteUserSnackbar + id
                setSnackbarProps({ ...tempSnackBarProps })
            }).catch((e) => {
                var tempSnackBarProps = snackBarProps
                tempSnackBarProps.open = true
                tempSnackBarProps.severity = "error"
                tempSnackBarProps.message = `${e}`
                tempSnackBarProps.handleClose = () => {
                    tempSnackBarProps.open = false
                    setSnackbarProps({ ...tempSnackBarProps })
                }
                setSnackbarProps({ ...tempSnackBarProps })
            })
        }, [])


    return (
        <Block>
            <StyledH1 className={`text-white ${lang == 'en' ? 'font-jost' : 'font-notoSansTC'}`} color="white"
            >
                {pageName}
            </StyledH1>

            <Block boxShadow='0px 10px 30px rgba(0, 0, 0, 0.1)' borderRadius='32px' mb='30px'>
                <ExpandableRowTable
                    dataObjList={mapDataByCol(data, columnMap, role, false)}
                    mobileDataObjList={mapDataByCol(data, columnMap, role, true)}
                    columnsFromParent={columnMap}
                    title={pageName}
                    popupTitle={userString.deleteFromPopupTitle}
                    message={userString.deleteUserPopupMessage}
                    proceedFunc={(data) => {
                        handleDelete(data)
                    }}
                    handleClickAdd={() => {
                        router.push(`${router.asPath}/add`)
                    }}
                />
            </Block>
            <BasicSnackBar {...snackBarProps} />
        </Block>
    )
}

export async function getServerSideProps(ctx: CustomCtx) {
    const preProps = await preprocessServerSideProps(ctx)
    if (preProps.redirect)
        return preProps

    const { pageName } = ctx.query
    const { profile, token, siteConfig, user } = ctx?.props || {}
    const { slug, lang } = ctx.params
    const collection = 'user'
    const userType = profile?.userType
    const columnMap = [
        {
            name: "userID",
            desktopIgnore: true,
            objPath: "userID",
        },
        {
            name: "userDisplayID",
            mobileDisplay: true,
            mobileCollapse: true,
            objPath: "userDisplayID",
        },
        {
            name: "name",
            mobileDisplay: true,
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
            valueType: "boolean",
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
        return deserializeListInit(data.result)
    }).catch((e) => {
        console.log("error getserversideProps", e)
    })


    console.log("data yoyo", data)
    return {
        props: {
            columnMap,
            data: data,
            user,
            collection,
        },
    }
}

export default withCookies(AccountList)