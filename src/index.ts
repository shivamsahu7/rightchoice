import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { adminRoutes } from './routes/admin';

const app = new Elysia()
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
  // 3. Start Server
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);