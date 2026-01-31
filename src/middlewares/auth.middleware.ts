import { Elysia } from 'elysia'
import { jwt } from '@elysiajs/jwt'

export const isAuthenticated = new Elysia()
  .use(
    jwt({
      name: 'authJwt',
      secret: process.env.JWT_SECRET || 'your-secret-key'
    })
  )
  .derive({ as: 'global' }, async ({ authJwt, headers: { authorization }, set }) => {
    if (!authorization) {
      set.status = 401
      return { user: null } 
    }

    const token = authorization.startsWith('Bearer ') 
      ? authorization.slice(7) 
      : authorization

    const payload = await authJwt.verify(token)

    if (!payload) {
      set.status = 401
      return { user: null }
    }

    // This "injects" the user property into the context for all subsequent steps
    return {
      user: payload as { userId: number; email: string; role: string }
    }
  })
  .onBeforeHandle(({ user, set }) => {
    // This is the actual guard that stops the request
    if (!user) {
      set.status = 401
      return { error: 'Unauthorized', message: 'Invalid or missing token' }
    }
  })