import { GetServerSidePropsContext } from "next"
import withLogin from "./with-login"

const preprocessServerSidePropsPromise = withLogin(
  async (ctx, staticPath?) => {
    const { props, params } = ctx
    const { token, authenticated } = props
    const { lang } = params
    if (authenticated && token) {
      // if () { }
      return {
        ...(staticPath == "login" ? {
          redirect: {
            permanent: false,
            destination: `/${lang}/machine-management`,
          },
        } : {}),
        props: {
          ...props,
        },
      }
    } else {
      return {
        redirect: {
          permanent: false,
          destination: `/${lang}/login`,
        },
        props: {},
      }
    }
  },
  {
    tokenKey: 'userToken',
  }
)

export interface CustomCtx extends GetServerSidePropsContext {
  props: any
 }

export const preprocessServerSideProps = async (ctx, staticPath?) => {
  return await preprocessServerSidePropsPromise(ctx,staticPath).then((res) => {
    return res
  })
} 