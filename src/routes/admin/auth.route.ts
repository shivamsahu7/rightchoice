import { Elysia, t } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { login } from '../../controllers/admin/auth.controller';

export const authRoutes = new Elysia({ prefix: '/auth' })
  .use(
    jwt({
      name: 'authJwt', // This name must match what you use in the controller
      secret: process.env.JWT_SECRET || 'your-secret-key',
      exp: '7d'
    })
  )
  .post('/login', (context) => login(context), {
    body: t.Object({
      email: t.String({ format: 'email' }),
      password: t.String()
    }),
    detail: {
      summary: 'Admin Login',
      tags: ['Admin Auth']
    }
  });