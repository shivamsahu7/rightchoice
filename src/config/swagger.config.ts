import { swagger } from '@elysiajs/swagger'

export const swaggerConfig = swagger({
  path: '/swagger',
  documentation: {
    info: {
      title: 'Tempered Glass API',
      version: '1.0.0',
      description: 'API documentation for Tempered Glass application'
    },
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Media Directories', description: 'Media directory management endpoints' }
    ]
  }
})
