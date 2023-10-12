import { withCookies } from 'react-cookie'
// import { getEnvVariable, test } from '/lib/helper'
import { preprocessServerSideProps } from 'lib/serverside-prepro'
import { useStore } from 'store/index'
import get from 'lodash/get'
// import { prisma } from '../../../lib/prisma'

const PalletConfig = (props) => {
    const { cookies, profile } = props
    const token = cookies.get("userToken")
    // console.log("PatientList props", props)
    const {
        state: {
            site: { lang },
            user: { userProfile }
        },
        dispatch,
    } = useStore()
    // const listPatientString = get(listPatient, lang)
    // const [editState, setEditState] = useState({})
    

    return (
        <>test</>
    )
}

export async function getServerSideProps(ctx) {
    const preProps = await preprocessServerSideProps(ctx)
    if (preProps.redirect)
        return preProps

    const { profile, token, siteConfig } = ctx?.props || {}
    const { slug, lang } = ctx.params
    const collection = 'patients'
    const userType = profile?.userType
    // const a = test();
    // const b = await prisma.

    return {
        props: {
            // contentData,
            // data,
            // physioData,
            // subscriptionData,
            headerTheme: 'white',
            headerPosition: 'fixed',
            // profile,
            // siteConfig
        },
    }
}

export default withCookies(PalletConfig)