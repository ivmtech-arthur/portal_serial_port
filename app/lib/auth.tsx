import { PrismaClient } from '@prisma/client'
import { AuthorisedMiddleware, isAuthorised, prisma } from './prisma'
import { ClientFetcher } from 'lib/fetcher'
// import { serialize } from 'superjson'

const fakeLogin = () => {
  return ClientFetcher.get('/api/oauth/token', {
    params: {
      grantType: 'authorizationCode',
      code: 'admin',
      provider: 'microsoft',
    },
  })

}

const getUser = async (token) => {
  // console.log("getUser token",token)
  // const prisma2 = new PrismaClient({datasourceUrl: "sqlserver://aws.ivmtech.com:21433;database=iVendingDB_AICabinet;user=sa;password=Ivm.98123316;encrypt=true;trustServerCertificate=true"});
  const result = await prisma.user.findFirst({
    where: {
      userSession: {
        refreshToken: token
      }
    },
    include: {
      profile: true,

    },
    // include: {
    //   user: true,
    // }
  })
  delete result.password
  //notes: can use deserialize()) instead xd
  return result;
  // return await ClientFetcher.get('/api/users/me', {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }).then(({ data }) => data)
}

const getSystemContant = async (token) => {
  // await isAuthorised(token)
  const constant: any = await prisma.systemConstant.findFirst().then((result) => {
    return JSON.parse(result.Json)
  });
  return constant
}

const getPermission = (role) => {
  switch (role) {
    case 'admin':
      return {
        approvable: true,
        editDraft: true,
        mangeMember: true,
        viewable: true,
        creatable: true,
        editPublished: true,
      }
  }
}

export { fakeLogin, getPermission, getUser, getSystemContant }
