import { PrismaClient } from '@prisma/client'
import { prisma } from './prisma'
import { ClientFetcher } from 'lib/fetcher'

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
        token: token
      }
    },
    include: {
      profile: true
    }
    // include: {
    //   user: true,
    // }
  })
  
  return result;
  // return await ClientFetcher.get('/api/users/me', {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // }).then(({ data }) => data)
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

export { fakeLogin, getPermission, getUser }
