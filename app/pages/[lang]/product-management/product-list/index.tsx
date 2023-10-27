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
import { productContent } from 'data/product'
import axios from 'axios'
import BasicSnackBar, { SnackBarProps } from 'components/snackbar'
const ProductList = (props) => {
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

    // console.log("accountList props", props, pageName, lang, data, columnMap, role)
    const [snackBarProps, setSnackbarProps] = useState<SnackBarProps>({
        open: false,
        handleClose: () => {
        },
        message: "",
        severity: 'success'
    })
    const productString = get(productContent, lang)
    const router = useRouter()

    const handleDelete = useCallback(
        async (id) => {
            await axios.delete(`/api/prisma/product/${id}`, {
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
                tempSnackBarProps.message = productString.deleteproductSnackbar + id
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
                    popupTitle={productString.deleteFromPopupTitle}
                    title={pageName}
                    message={productString.deleteProductPopupMessage}
                    handleDelete={(data) => {
                        handleDelete(data)
                    }}
                    // handleClickEditFromParent={(displayID) => {
                    //     router.push(`${router.asPath}/${displayID}`)
                    // }}
                    handleClickAdd={() => { 
                        router.push(`/${lang}/product-management/create-product`)
                    }}
                />
            </Block>
            <BasicSnackBar {...snackBarProps} />
        </Block>
    )
}

export async function getServerSideProps(ctx: CustomCtx) {
    console.log("productList", global.s3)
    const preProps = await preprocessServerSideProps(ctx)
    if (preProps.redirect)
        return preProps

    const { profile, token, siteConfig, user } = ctx?.props || {}
    const collection = 'masterProduct'
    const columnMap = [
        {
            name: "productID",
            desktopIgnore: true,
            objPath: "productID",
        },
        {
            name: "productDisplayID",
            mobileDisplay: true,
            mobileCollapse: true,
            objPath: "userDisplayID",
        },
        {
            name: "isActive",
            mobileCollapse: true,
            objPath: "isActive",
        },
        {
            name: "suspend",
            mobileCollapse: true,
            objPath: "suspend",
        },
        {
            name: "productName",
            mobileCollapse: true,
            objPath: "productName",
        },
        {
            name: "productNameEn",
            mobileCollapse: false,
            objPath: "productNameEn",
        },
        {
            name: "desc",
            mobileCollapse: false,
            objPath: "desc",
        },
        {
            name: "descEn",
            mobileCollapse: false,
            objPath: "descEn",
        },
        {
            name: "price",
            mobileCollapse: false,
            objPath: "price",
        },
        {
            name: "unitPrice",
            mobileCollapse: false,
            objPath: "unitPrice",
        },
        {
            name: "unit",
            mobileCollapse: false,
            objPath: "unit",
        },
        {
            name: "currency",
            mobileCollapse: false,
            objPath: "currency",
        },
        {
            name: "remark",
            mobileCollapse: false,
            objPath: "remark",
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
        return JSON.parse(JSON.stringify(data.result))
    }).catch((e) => {
        console.log("error getserversideProps", e)
    })
    // var customRequest: CustomRequest = {
    //     query: {
    //         collection,

    //     },
    //     method: ctx.req.method,
    // }


    // const data = await internalAPICallHandler(customRequest).then((data) => {
    //     return data
    // }).catch((e) => {
    //     console.log("error getserversideProps", e)
    // })
    console.log("dataxd", data)
    return {
        props: {
            // contentData,
            // physioData,
            // subscriptionData,
            data,
            columnMap,
            headerTheme: 'white',
            headerPosition: 'fixed',
            collection,
            // pageName: "account Management"
            // profile,
            // siteConfig
        },
    }
}

export default withCookies(ProductList)