import { api } from './api'

export async function uploadFile(
  fileEntry: string | File | null,
  token: string,
) {
  const uploadFormData = new FormData()
  uploadFormData.set('file', fileEntry || '')

  const uploadResponse = await api.post('/upload', uploadFormData, {
    headers: {
      Authorization: token,
    },
  })

  return uploadResponse.data.fileUrl
}
