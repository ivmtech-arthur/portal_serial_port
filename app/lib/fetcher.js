import axios from 'axios'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { APP_URL, API_URL },
  serverRuntimeConfig: { BACKEND_URL },
} = getConfig()

axios.defaults.headers.post['Content-Type'] = 'application/json'

const ClientFetcher = axios.create({
  baseURL: API_URL,
})

const LocalFetcher = axios.create({
  baseURL: '',
})

const ServerFetcher = axios.create({
  baseURL: BACKEND_URL,
})

export { ClientFetcher, ServerFetcher, LocalFetcher }
