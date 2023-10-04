import merge from 'lodash/merge'
import Cookies from 'cookies'
import { getPermission, getUser } from '/lib/auth'

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
  return async (ctx) => {
    const opts = merge({}, defaultOpts, assignOpts)
    const { tokenKey } = opts
    const cookies = new Cookies(ctx.req, ctx.res, { keys: [''] })

    const token = cookies.get(tokenKey)
    const profile = await getUser(token)
    const role = cookies.get('role')
    const permissions = getPermission(role)
    if (token) {
      ctx.props = {
        token,
        role,
        authenticated: true,
        permissions,
        profile,
      }
    } else {
      ctx.props = {
        authenticated: false,
      }
    }
    return await gssp(ctx)
  }
}

export default withLogin
