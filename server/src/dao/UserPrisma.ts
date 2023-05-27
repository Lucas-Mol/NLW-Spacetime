import { prisma } from '../lib/prisma'
import { UserRegister } from '../routes/auth'

export async function getUserByGithubId(userInfo: UserRegister) {
  return await prisma.user.findUnique({
    where: {
      githubId: userInfo.id,
    },
  })
}
export async function createUser(userInfo: UserRegister) {
  return await prisma.user.create({
    data: {
      githubId: userInfo.id,
      login: userInfo.login,
      name: userInfo.name,
      avatarUrl: userInfo.avatar_url,
    },
  })
}
