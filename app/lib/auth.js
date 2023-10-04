import { ClientFetcher } from '/lib/fetcher'

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
  return await ClientFetcher.get('/api/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(({ data }) => data)
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
