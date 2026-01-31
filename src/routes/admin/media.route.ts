import { Elysia, t } from 'elysia'
import { listMediaDirectories } from '../../controllers/admin/media.controller'
import { isAuthenticated } from '../../middlewares/auth.middleware'

export const mediaRoutes = new Elysia({ prefix: '/media' })
  .use(isAuthenticated) // Middleware applied here
  .get('/', (context) => listMediaDirectories(context), {
    query: t.Object({
      page: t.Optional(t.String()),
      limit: t.Optional(t.String())
    })
  })