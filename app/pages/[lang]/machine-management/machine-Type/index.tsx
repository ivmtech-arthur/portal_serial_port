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
import { handleDeleteS3, mapDataByCol } from 'lib/helper'
import { machineContent } from 'data/machine'
import axios from 'axios'
import BasicSnackBar, { SnackBarProps } from 'components/snackbar'
import { Prisma } from '@prisma/client'
import { AlertColor } from '@mui/material'
const MachineTypeList = (props) => {
    const { cookies, profile, data, columnMap, collection } = props
    const token = cookies.get("accessToken")
    const role = cookies.get("userRole")

    const {
        state: {
            site: { lang, pageName },
            user: { userProfile }
        },
        dispatch,
    } = useStore()

    const [snackBarProps, setSnackbarProps] = useState<SnackBarProps>({
        open: false,
        handleClose: () => {
        },
        message: "",
        severity: 'success'
    })
    const machineString = get(machineContent, lang)
    const router = useRouter()

    const handleSetHandleBarProps = useCallback((open: boolean, handleClose: () => void, message: String, severity: AlertColor) => {
        setSnackbarProps({
            open: open,
            handleClose: handleClose,
            message: message,
            severity: severity
        })
    }, [])

    const handleDelete = useCallback(
        async (oldData) => {
            const id = oldData[0]
            let select: Prisma.MachineTypeSelect = {
                // attachment: true
            }
            await axios.delete(`/api/prisma/machineType/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    select
                }
            }).then(async (data) => {
                console.log("success!!")
                await handleDeleteS3(oldData.attachment, token).catch((e) => {
                    throw e
                })
                handleSetHandleBarProps(true, () => { router.reload() }, machineString.editmachineTypeSnackBar, "success")
            }).catch((e) => {
                handleSetHandleBarProps(true, () => { }, `${e}`, "error")
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
                    popupTitle={machineString.deleteFromPopupTitle}
                    title={pageName}
                    message={machineString.deletemachineTypePopupMessage}
                    handleDelete={(data) => {
                        handleDelete(data)
                    }}
                    handleClickAdd={() => {
                        router.push(`/${lang}/machine-management/machine-Type/add`)
                    }}
                />
            </Block>
            <BasicSnackBar {...snackBarProps} />
        </Block>
    )
}

export async function getServerSideProps(ctx: CustomCtx) {
    console.log("machineTypeList", global.s3)
    const preProps = await preprocessServerSideProps(ctx)
    if (preProps.redirect)
        return preProps

    const { profile, token, siteConfig, user } = ctx?.props || {}
    const collection = 'machineType'
    const columnMap = [
        {
            name: "machineTypeID",
            desktopIgnore: true,
            objPath: "machineTypeID",
        },
        {
            name: "machineTypeDisplayID",
            mobileDisplay: true,
            mobileCollapse: true,
            objPath: "machineTypeDisplayID",
        },
        {
            name: "machineTypeName",
            mobileCollapse: true,
            objPath: "machineTypeName",
        },
        {
            name: "machineTypeNameEn",
            mobileCollapse: false,
            objPath: "machineTypeNameEn",
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

    console.log("dataxd", data)
    return {
        props: {
            data,
            columnMap,
            headerTheme: 'white',
            headerPosition: 'fixed',
            collection,
        },
    }
}

export default withCookies(MachineTypeList)