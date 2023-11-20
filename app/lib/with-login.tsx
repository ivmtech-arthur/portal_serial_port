import merge from 'lodash/merge'
import Cookies from 'cookies'
import { getPermission, getUser, getSystemContant } from 'lib/auth'

const withLogin = (
  gssp,
  assignOpts = {},
  defaultOpts = {
    type: 'authenticated',
    tokenKey: 'refreshToken',
    redirect: {
      path: false,
    },
  }
) => {
  return async (ctx, staticPath?) => {

    const opts = merge({}, defaultOpts, assignOpts)
    const { tokenKey } = opts
    const cookies = new Cookies(ctx.req, ctx.res, { keys: [''] })

    const token = cookies.get(tokenKey)
    const user = await getUser(token)
    const role = cookies.get('role')
    const permissions = getPermission(role)
    console.log("ctx type", user, token)
    if (user) {
      const tempConstant = await getSystemContant(token)
      const { cloudFrontURL, schema } = tempConstant
      const systemConstant = {
        ...({ cloudFrontURL, schema })
      }
      ctx.props = {
        token,
        role,
        user,
        authenticated: true,
        permissions,
        systemConstant
        // profile,
      }
    } else {
      ctx.props = {
        authenticated: false,
      }
    }
    return await gssp(ctx, staticPath)
  }
}

export default withLogin
