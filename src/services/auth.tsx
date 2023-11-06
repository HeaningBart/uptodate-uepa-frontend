import { Token } from "@/types";
import API from "./api";
const logInRequest = async (email: string, password: string) => {
    const { token } = (await API.post<{ token: Token }>('/login', {
        email, password
    })).data
    return token;
}


const signUpRequest = async (email: string, password: string) => {

    await API.post('/register', { email, password })
    const token = await logInRequest(email, password);
    return token;
}


export { logInRequest, signUpRequest }