import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { User } from "@/types"


export type userDataResponse = {
    id: string,
    username: string,
    email: string,
    role: 'Reader' | 'Editor' | 'Admin',
    coins: number,
    profile_picture: string,
    patreon_account: any,
}

export type UserDataResponse = {
    isLoggedIn: boolean;
    user: User | undefined;
}

type UsersDataResponse = {
    meta: any
    data: User[]
}

const ALLOWED_ROLES = ['Admin', 'Editor']

const checkAuth = async () => {
    const data = await getUserData()
    if (!data.isLoggedIn) redirect('/login')
    if (data && data.user) {
        if (!ALLOWED_ROLES.includes(data.user.role)) redirect('/login')
    }

}

const getUserData = async (): Promise<UserDataResponse> => {
    const cookieStore = cookies();
    const token = cookieStore.get("_r");
    if (!token) {
        redirect('/login')
    }
    const url = new URL('/auth/user', process.env.NEXT_PUBLIC_LOCAL_API)
    const user_data: UserDataResponse = (await (await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token.value}`
        },
        cache: 'no-cache'
    })).json())
    return user_data;
}

export async function checkStatus() {
    const cookieStore = cookies();
    const token = cookieStore.get("_r");
    if (!token) {
        redirect('/login')
    }
    const url = new URL('/status', process.env.NEXT_PUBLIC_LOCAL_API)
    const user_data: { isAllowed: boolean } = (await (await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token.value}`
        },
        cache: 'no-cache'
    })).json())


    const { isAllowed } = user_data
    if (!isAllowed) {
        redirect('/store')
    }

}

const getUsers = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get("_r");
    if (!token) {
        redirect('/login')
    }
    const url = new URL('/users', process.env.NEXT_PUBLIC_LOCAL_API)
    const users_data: UsersDataResponse = (await (await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token.value}`
        }
    })).json())
    return users_data;
}


export const getUser = async (id: string) => {
    const cookieStore = cookies();
    const token = cookieStore.get("_r");
    if (!token) {
        redirect('/login')
    }
    const url = new URL('/users/' + id, process.env.NEXT_PUBLIC_LOCAL_API)
    const users_data: User = (await (await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
        }
    })).json())
    return users_data;
}


const onlyLoggedIn = () => {
    const cookieStore = cookies();
    const token = cookieStore.get('_r');
    if (!token) redirect('/');
}

const onlyGuest = () => {
    const cookieStore = cookies();
    const token = cookieStore.get('_r');
    if (token) redirect('/search');
}

const isLoggedIn = () => {
    const cookieStore = cookies();
    const token = cookieStore.get('_r');
    return token ? true : false
}




export { checkAuth, onlyLoggedIn, getUserData, getUsers, isLoggedIn, onlyGuest }