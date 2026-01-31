export type UserRole = 'admin' | 'customer'

export interface JWTPayload {
  userId: number
  email: string
  role: UserRole
}

export interface AuthContext {
  user: JWTPayload | null
  isAuthenticated: boolean
}
