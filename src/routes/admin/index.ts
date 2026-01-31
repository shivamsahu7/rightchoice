import { Elysia } from 'elysia';
import { authRoutes } from './auth.route';
import { mediaRoutes } from './media.route';

export const adminRoutes = new Elysia({ prefix: '/admin' })
  .use(authRoutes)
  .use(mediaRoutes);