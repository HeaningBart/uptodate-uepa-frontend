import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { User } from '@/types/users'

export type userDataResponse = {
  id: string
  email: string
  role: 'User' | 'Admin'
}

export type UserDataResponse = {
  isLoggedIn: boolean
  user: User | undefined
}

type UsersDataResponse = {
  meta: any
  data: User[]
}

const ALLOWED_ROLES = ['Admin']

const checkAuth = async () => {
  const data = await getUserData()

  if (!data.isLoggedIn) redirect('/login')

  if (data && data.user) {
    if (!ALLOWED_ROLES.includes(data.user.role)) redirect('/login')
  }
}

const getUserData = async (): Promise<UserDataResponse> => {
  const cookieStore = cookies()
  const token = cookieStore.get('_r')
  if (!token) {
    redirect('/login')
  }
  const url = new URL('/auth/user', process.env.LOCAL_API_URL)
  const user_data: UserDataResponse = await (
    await fetch(url, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
  ).json()
  return user_data
}

const getUsers = async () => {
  const cookieStore = cookies()
  const token = cookieStore.get('_r')
  if (!token) {
    redirect('/login')
  }
  const url = new URL('/users', process.env.LOCAL_API_URL)
  const users_data: UsersDataResponse = await (
    await fetch(url, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
  ).json()
  return users_data
}

export const getUser = async (id: string) => {
  const cookieStore = cookies()
  const token = cookieStore.get('_r')
  if (!token) {
    redirect('/login')
  }
  const url = new URL('/users/' + id, process.env.LOCAL_API_URL)
  const users_data: User = await (
    await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
    })
  ).json()
  return users_data
}

const onlyLoggedIn = async () => {}

const isLoggedIn = () => {
  const cookieStore = cookies()
  const token = cookieStore.get('_r')
  return token ? true : false
}

export { checkAuth, onlyLoggedIn, getUserData, getUsers, isLoggedIn }
