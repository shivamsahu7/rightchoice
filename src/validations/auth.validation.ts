import { t } from 'elysia'

export const loginSchema = t.Object({
  email: t.String({
    format: 'email',
    error: 'Email is invalid',
  }),
  password: t.String({
    minLength: 8,
    error: 'Password must be at least 8 characters',
  }),
})
