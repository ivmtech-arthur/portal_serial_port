import React from 'react'
import Block from 'components/Common/Element/Block'
import { CustomCtx, preprocessServerSideProps } from 'lib/serverside-prepro'
import { CustomRequest, internalAPICallHandler } from 'lib/api/handler'
import ExpandableRowTable from 'components/Table/expandableTable'
import { withCookies } from 'react-cookie'
const ProductList = (props) => {
    // const {test,} = props
    return (
        <Block>
            test
            {/* <ExpandableRowTable
                dat
            /> */}
        </Block>
    )
}

export async function getServerSideProps(ctx: CustomCtx) {
    console.log("productList", global.s3)
    const preProps = await preprocessServerSideProps(ctx)
    if (preProps.redirect)
        return preProps

    const { profile, token, siteConfig } = ctx?.props || {}
    const collection = 'productMaster'

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

    return {
        props: {
            // contentData,
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

export default withCookies(ProductList)