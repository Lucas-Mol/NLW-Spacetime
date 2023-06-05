import 'dotenv/config'
import fastify from 'fastify'
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

const app = fastify()

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(multipart, {
  limits: {
    fileSize: 25_242_880, // 25mb
  },
})

app.register(cors, {
  origin: true, // to do
})
app.register(jwt, {
  secret: 'spacetime', // to do
})
app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app.get('/', () => {
  return 'Hello World 🌍'
})

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333')
  })
