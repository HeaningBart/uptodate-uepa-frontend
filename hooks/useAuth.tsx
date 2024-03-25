import { fetcher } from '@/services/api'
import useSWRImmutable from 'swr/immutable'

export default function useAuthentication() {
  const { data, error, isLoading, mutate } = useSWRImmutable(
    '/auth/user',
    fetcher
  )

  return { data, error, isLoading, mutate }
}

export async function logOut() {
  await fetch('/api/logout')
}
