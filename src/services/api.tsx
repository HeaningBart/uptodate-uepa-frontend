import axios from 'axios'
import { parseCookies } from 'nookies'



export function getAPIClient() {
    const isServerSide = typeof window == 'undefined' ? true : false
    const { '_r': auth_cookie } = parseCookies();
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_LOCAL_API,
    })
    api.interceptors.request.use(config => {
        return config;
    })
    if (auth_cookie) {
        api.defaults.headers.common['Authorization'] = `Bearer ${auth_cookie}`
    }
    return api;
}
const API = getAPIClient();

export default API;
