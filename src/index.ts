import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import { adminRoutes } from './routes/admin';
import { googleAuthRoutes } from './routes/google-auth.route';
import { reviewRoutes } from './routes/review.route';

const app = new Elysia()
  .use(cors())
  // 1. Setup Swagger
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Elysia Admin API',
          version: '1.0.0',
        },
      },
      path: '/docs' // Swagger UI will be available at /docs
    })
  )
  .group('/api/v1', (app) =>
    app.use(adminRoutes)
  )
  .group('/api/v1', (app) =>
    app.use(googleAuthRoutes)
  )
  .group('/api/v1', (app) =>
    app.use(reviewRoutes)
  )


  // 3. Start Server
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);