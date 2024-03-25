'use server'
import { cookies } from 'next/headers'
import API from '@/services/api'
export type Token = {
  expires_at: string
  token: string
  type: 'Bearer'
}
export async function authenticate(data: { email: string; password: string }) {
  const cookie_store = cookies()
  const { token } = (
    await API.post<Token>(`${process.env.LOCAL_API_URL}/auth/login`, data)
  ).data
  cookie_store.set('_r', token, {
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}
