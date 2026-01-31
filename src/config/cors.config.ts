import { cors } from '@elysiajs/cors'

export const corsConfig = cors({
  origin: true, // Allow all origins, configure as needed
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
})
    