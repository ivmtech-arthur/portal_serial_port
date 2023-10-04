import withLogin from "./with-login"

const preprocessServerSidePropsPromise = withLogin(
  async (ctx) => {
    const { props, params } = ctx
    const { token, authenticated } = props
    const { lang } = params
    console.log("preprocessServerSidePropsPromise",props, params)
    if (authenticated && token) {
      return {
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

export const preprocessServerSideProps = async (ctx) => {
  return await preprocessServerSidePropsPromise(ctx).then((res) => {
    return res
  })
} 