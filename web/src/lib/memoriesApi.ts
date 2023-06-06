import { Memory } from './Memory'
import { api } from './api'

export async function getAllMemoriesByUser(token: string) {
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: Memory[] = response.data

  return memories
}

export async function getMemoryById(id: string, token: string) {
  const response = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory: Memory = response.data

  return memory
}

export async function postNewMemory(
  formData: FormData,
  coverUrl: string,
  token: string,
) {
  const response = await api.post(
    '/memories',
    {
      coverUrl,
      content: formData.get('content'),
      isPublic: formData.get('isPublic'),
    },
    {
      headers: {
        Authorization: token,
      },
    },
  )

  return response.data.id
}
