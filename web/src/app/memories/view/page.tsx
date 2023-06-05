'use client'
import { BackwardLink } from '@/components/BackwardLink'
import { MediaViewer } from '@/components/MediaViewer'
import { TimerDash } from '@/components/TimerDash'
import { api } from '@/lib/api'

import Cookies from 'js-cookie'
import { useRouter, useSearchParams } from 'next/navigation'

interface Memory {
  id: string
  coverUrl: string
  content: string
  createdAt: string
}

export default async function MemoryView() {
  const router = useRouter()
  const token = Cookies.get('token')
  const params = useSearchParams()
  const memoryId = params.get('id')

  if (!token || !memoryId) {
    router.push('/')
  }

  const response = await api.get(`/memories/${memoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory: Memory = response.data

  return (
    <div className="flex flex-col gap-10 space-y-4 p-8">
      <BackwardLink url="/" text="Voltar à timeline"></BackwardLink>

      <TimerDash time={memory.createdAt} />

      <MediaViewer url={memory.coverUrl} />

      <p className="text-lg leading-relaxed text-gray-100">{memory.content}</p>
    </div>
  )
}
