import merge from 'lodash/merge'
import Cookies from 'cookies'
import { getPermission, getUser } from 'lib/auth'

const withLogin = (
  gssp,
  assignOpts = {},
  defaultOpts = {
    type: 'authenticated',
    tokenKey: 'userToken',
    redirect: {
      path: false,
    },
  }
) => {
  return async (ctx, staticPath?) => {
    console.log("ctx type", typeof ctx)
    const opts = merge({}, defaultOpts, assignOpts)
    const { tokenKey } = opts
    const cookies = new Cookies(ctx.req, ctx.res, { keys: [''] })

    const token = cookies.get(tokenKey)
    const user = await getUser(token)
    const role = cookies.get('role')
    const permissions = getPermission(role)
    if (user) {
      ctx.props = {
        token,
        role,
        authenticated: true,
        permissions,
        // profile,
      }
    } else {
      ctx.props = {
        authenticated: false,
      }
    }
    return await gssp(ctx,staticPath)
  }
}

export default withLogin
