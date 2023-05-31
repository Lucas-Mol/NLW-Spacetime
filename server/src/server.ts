import 'dotenv/config'
import jwt from '@fastify/jwt'
import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(cors, {
  origin: true, // to do
})
app.register(jwt, {
  secret: 'spacetime', // to do
})
app.register(authRoutes)
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
