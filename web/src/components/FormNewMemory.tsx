'use client'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import { MediaInput } from './MediaInput'
import { MemoryContentTextArea } from './MemoryContentTextArea'
import { PublicCheckbox } from './PublicCheckbox'
import { TransparentMediaPickerAndPreview } from './TransparentMediaPickerAndPreview'
import { SubmitButton } from './SubmitButton'

import Cookie from 'js-cookie'
import { postNewMemory } from '@/lib/memoriesApi'
import { uploadFile } from '@/lib/uploadApi'
import { MemoryDatePicker } from './MemoryDatePicker'

export function FormNewMemory() {
  const router = useRouter()

  const [selectedDate, setSelectedDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  })

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const newMemoryId = await createMemoryAndGetMemoryId(
      formData,
      new Date(selectedDate.startDate),
    )

    router.push(`/memories/${newMemoryId}`)
  }

  const mediaInputId = 'media'

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <MediaInput mediaInputId={mediaInputId} />

          <PublicCheckbox />
        </div>
        <MemoryDatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      <TransparentMediaPickerAndPreview mediaInputId={mediaInputId} />

      <MemoryContentTextArea />

      <SubmitButton text="Salvar" />
    </form>
  )
}

async function createMemoryAndGetMemoryId(
  formData: FormData,
  selectedDate: Date,
) {
  const token = `Bearer ${Cookie.get('token')}`
  const fileToUpload = formData.get('coverUrl')

  let coverUrl: string = ''

  if (fileToUpload instanceof File && fileToUpload?.name) {
    coverUrl = await uploadFile(fileToUpload, token)
  }

  const content = formData.get('content')?.toString()!
  const isPublic = !!formData.get('isPublic')?.toString()!
  const formatedDate = selectedDate.toISOString()

  const data = await postNewMemory(
    content,
    isPublic,
    formatedDate,
    coverUrl,
    token,
  )

  return data
}
