import jwt from '@elysiajs/jwt'

export const jwtConfig = jwt({
  name: 'jwt',
  secret: process.env.JWT_SECRET || 'your-secret-key',
  exp: '7d' // Token expires in 7 days
})
