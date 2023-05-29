import { FastifyInstance } from 'fastify'
import axios from 'axios'
import { z } from 'zod'
import { getUserByGithubId, createUser } from '../dao/UserPrisma'
import { User } from '@prisma/client'

const userRegisterSchema = z.object({
  id: z.number(),
  login: z.string(),
  name: z.string(),
  avatar_url: z.string().url(),
})
export type UserRegister = z.infer<typeof userRegisterSchema>

const bodyCodeRegisterSchema = z.object({
  code: z.string(),
})

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request) => {
    const { code } = bodyCodeRegisterSchema.parse(request.body)
    const accessTokenResponse = await getAccessTokenResponse(code)

    const { access_token } = accessTokenResponse.data
    const userResponse = await getUserResponse(access_token)

    const userInfo = userRegisterSchema.parse(userResponse.data)

    const user = await getUser(userInfo)

    const token = getJWToken(app, user)

    return {
      token,
    }
  })
}

function getAccessTokenResponse(code: string) {
  return axios.post('https://github.com/login/oauth/access_token', null, {
    params: {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    headers: {
      Accept: 'application/json',
    },
  })
}

function getUserResponse(access_token: string) {
  return axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

async function getUser(userInfo: UserRegister) {
  let user = await getUserByGithubId(userInfo)

  if (!user) {
    user = await createUser(userInfo)
  }

  return user
}

function getJWToken(app: FastifyInstance, user: User) {
  return app.jwt.sign(
    {
      name: user.name,
      avatarUrl: user.avatarUrl,
    },
    {
      sub: user.id,
      expiresIn: '30 days',
    },
  )
}
