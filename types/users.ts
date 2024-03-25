export interface User {
  id: string
  email: string
  role: 'Admin' | 'User'
  created_at: string
  isAuthorized: boolean
  authorizedUntil: string
}
