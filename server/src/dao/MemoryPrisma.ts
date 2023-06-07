import { prisma } from '../lib/prisma'

export async function getMemoriesByUserId(userId: string) {
  return await prisma.memory.findMany({
    where: {
      userId,
    },
    orderBy: { createdAt: 'asc' },
  })
}
export async function getMemoryByIdOrThrow(id: string) {
  return await prisma.memory.findUniqueOrThrow({
    where: {
      id,
    },
  })
}
export async function createMemory(
  content: string,
  coverUrl: string,
  isPublic: boolean,
  createdAt: string,
  userId: string,
) {
  return await prisma.memory.create({
    data: {
      content,
      coverUrl,
      isPublic,
      createdAt,
      userId,
    },
  })
}
export async function updateMemory(
  id: string,
  content: string,
  coverUrl: string,
  isPublic: boolean,
) {
  return await prisma.memory.update({
    where: {
      id,
    },
    data: {
      content,
      coverUrl,
      isPublic,
    },
  })
}
export async function removeMemory(id: string) {
  return await prisma.memory.delete({
    where: {
      id,
    },
  })
}
