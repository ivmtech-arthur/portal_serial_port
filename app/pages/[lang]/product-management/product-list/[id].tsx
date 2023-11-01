import { CustomCtx, preprocessServerSideProps } from 'lib/serverside-prepro'
import Block from 'components/Common/Element/Block'
import { useStore } from 'store'
import getConfig from 'next/config'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { withCookies } from 'react-cookie'
import { CustomRequest, internalAPICallHandler } from 'lib/api/handler'
import StyledH1 from 'components/Common/Element/H1'
import FormHandler from 'components/Form'
import superjson, { convertObjDecimalToNum } from 'lib/superjson'
import { deserialize } from 'superjson'
const { publicRuntimeConfig } = getConfig()
const { API_URL, APP_URL } = publicRuntimeConfig


const ProductDetail = (props) => {
    const { cookies, productData } = props
    const token = cookies.get("userToken")
    const role = cookies.get("userRole")
    const {
        state: {
            site: { lang, pageName },
            user: { userProfile }
        },
        dispatch,
    } = useStore()
    const [editState, setEditState] = useState({})
    const [filter, setFilter] = useState([])
    const [selectedField, setSelectedField] = useState('id')
    const [record, setRecord] = useState({})
    const [serverErrorMessage, setServerErrorMessage] = useState(null)
    const router = useRouter()

    return (
        <Block>
            <StyledH1 className={`${lang == 'en' ? 'font-jost' : 'font-notoSansTC'}`} color="white"
            >
                {pageName}
            </StyledH1>

            <Block boxShadow='0px 10px 30px rgba(0, 0, 0, 0.1)' bg='white' borderRadius='32px' mb='30px'>
                <FormHandler formType="ProductForm" mode="edit" productData={productData} />
            </Block>
            {/* <Popup type="local" /> */}
        </Block>
    )
}

export async function getServerSideProps(ctx: CustomCtx) {
    const preProps = await preprocessServerSideProps(ctx)
    if (preProps.redirect)
        return preProps

    const { pageName } = ctx.query
    const { profile, token, user, systemConstant } = ctx?.props || {}
    const { slug, lang, id } = ctx.params
    const collection = 'masterProduct'
    var getProduct: CustomRequest = {
        query: {
            collection,
            where: {
                productDisplayID: id
            },
            include: {
                attachment: true
            },
            isUnique: true
        },
        method: ctx.req.method,
    }


    const productData = await internalAPICallHandler(getProduct).then((data) => {
        return convertObjDecimalToNum(deserialize(data.result))
    }).catch((e) => {
        console.log("error getserversideProps", e)
    })

    return {
        props: {
            productData,
            collection,
            user,
            systemConstant
        },
    }
}

export default withCookies(ProductDetail)