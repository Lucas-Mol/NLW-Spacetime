import { FastifyInstance, FastifyRequest } from 'fastify'
import { MultipartFile } from '@fastify/multipart'

import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.post('/upload', async (request, reply) => {
    const upload = await request.file()

    try {
      if (!upload) {
        throw Error('Missing file')
      }
      validateUpload(upload)
    } catch (e: any) {
      return reply.status(400).send()
    }

    const fileName = createFileName(upload)

    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads/', fileName),
    )

    await pump(upload.file, writeStream)

    const fileUrl = getCoverUrl(request, fileName)

    return { fileUrl }
  })
}

function validateUpload(upload: MultipartFile) {
  const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/

  const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

  if (!isValidFileFormat) {
    throw Error('Mimetype errado')
  }
}

function createFileName(upload: MultipartFile) {
  const fileId = randomUUID()
  const extension = extname(upload.filename)

  return fileId.concat(extension)
}

function getCoverUrl(request: FastifyRequest, fileName: string) {
  const fullUrl = request.protocol.concat('://').concat(request.hostname)
  return new URL(`/uploads/${fileName}`, fullUrl).toString()
}
