import axios from 'axios'
import { parseCookies } from 'nookies'

export function getAPIClient() {
  const { _r: auth_cookie } = parseCookies()
  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  })
  api.interceptors.request.use((config) => {
    return config
  })
  if (auth_cookie) {
    api.defaults.headers.common['Authorization'] = `Bearer ${auth_cookie}`
  }
  return api
}
const API = getAPIClient()

export const fetcher = (url: string) => {
  return API.get(url).then((res) => res.data)
}

export default API
