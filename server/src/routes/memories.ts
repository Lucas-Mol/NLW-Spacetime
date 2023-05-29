import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import {
  getMemoriesByUserId,
  createMemory,
  updateMemory,
  getMemoryByIdOrThrow,
  removeMemory,
} from '../dao/MemoryPrisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  getMemories()

  getMemoryById()

  postMemory()

  putMemory()

  deleteMemory()

  function getMemories() {
    return app.get('/memories', async (request) => {
      const user = request.user

      const memories = await getMemoriesByUserId(user.sub)

      return memories.map((memory) => {
        return {
          id: memory.id,
          coverUrl: memory.coverUrl,
          excerpt: memory.content.substring(0, 115).concat('...'),
        }
      })
    })
  }

  function getMemoryById() {
    return app.get('/memories/:id', async (request, reply) => {
      const paramSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = paramSchema.parse(request.params)

      const memory = await getMemoryByIdOrThrow(id)

      if (!memory.isPublic && memory.userId !== request.user.sub) {
        return reply.status(401).send()
      }

      return memory
    })
  }

  function postMemory() {
    return app.post('/memories', async (request) => {
      const bodySchema = z.object({
        content: z.string(),
        coverUrl: z.string(),
        isPublic: z.coerce.boolean().default(false),
      })

      const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

      const userId = request.user.sub

      const memory = await createMemory(content, coverUrl, isPublic, userId)

      return memory
    })
  }

  function putMemory() {
    return app.put('/memories/:id', async (request, reply) => {
      const paramSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = paramSchema.parse(request.params)

      const bodySchema = z.object({
        content: z.string(),
        coverUrl: z.string(),
        isPublic: z.coerce.boolean().default(false),
      })

      const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

      let memory = await getMemoryByIdOrThrow(id)

      if (memory.userId !== request.user.sub) {
        return reply.status(401).send()
      }

      memory = await updateMemory(id, content, coverUrl, isPublic)

      return memory
    })
  }

  function deleteMemory() {
    return app.delete('/memories/:id', async (request, reply) => {
      const paramSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = paramSchema.parse(request.params)

      const memory = await getMemoryByIdOrThrow(id)

      if (memory.userId !== request.user.sub) {
        return reply.status(401).send()
      }

      removeMemory(id)
    })
  }
}
