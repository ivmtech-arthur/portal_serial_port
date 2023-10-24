import React from 'react'
import Block from 'components/Common/Element/Block'
import { CustomCtx, preprocessServerSideProps } from 'lib/serverside-prepro'
import { CustomRequest, internalAPICallHandler } from 'lib/api/handler'
import ExpandableRowTable from 'components/Table/expandableTable'
function ProductList(props) {
    const {test,} = props
    return (
        <Block>
            <ExpandableRowTable
                dat
            />
        </Block>
    )
}

export async function getServerSideProps(ctx: CustomCtx) {
    const preProps = await preprocessServerSideProps(ctx)
    if (preProps.redirect)
        return preProps

    const { profile, token, siteConfig } = ctx?.props || {}
    const collection = 'productMaster'

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
}

export default ProductList