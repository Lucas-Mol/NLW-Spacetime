'use client'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

import { MediaInput } from './MediaInput'
import { MemoryContentTextArea } from './MemoryContentTextArea'
import { PublicCheckbox } from './PublicCheckbox'
import { TransparentMediaPickerAndPreview } from './TransparentMediaPickerAndPreview'
import { SubmitButton } from './SubmitButton'

import Cookie from 'js-cookie'
import { postNewMemory } from '@/lib/memoriesApi'
import { uploadFile } from '@/lib/uploadApi'

export function FormNewMemory() {
  const router = useRouter()

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const newMemoryId = await createMemoryAndGetMemoryId(formData)

    router.push(`/memories/${newMemoryId}`)
  }

  const mediaInputId = 'media'

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <MediaInput mediaInputId={mediaInputId} />

        <PublicCheckbox />
      </div>

      <TransparentMediaPickerAndPreview mediaInputId={mediaInputId} />

      <MemoryContentTextArea />

      <SubmitButton text="Salvar" />
    </form>
  )
}

async function createMemoryAndGetMemoryId(formData: FormData) {
  const token = `Bearer ${Cookie.get('token')}`
  const fileToUpload = formData.get('coverUrl')

  let coverUrl: string = ''

  if (fileToUpload instanceof File && fileToUpload?.name) {
    coverUrl = await uploadFile(fileToUpload, token)
  }

  const data = await postNewMemory(formData, coverUrl, token)

  return data
}
