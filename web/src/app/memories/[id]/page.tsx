import { BackwardLink } from '@/components/BackwardLink'
import { MediaViewer } from '@/components/MediaViewer'
import { TimerDash } from '@/components/TimerDash'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Memory } from '@/lib/Memory'
import { getMemoryById } from '@/lib/memoriesApi'

interface Params {
  params: {
    id: string
  }
}

export default async function MemoryView({ params: { id } }: Params) {
  const token = cookies().get('token')?.value

  if (!token || !id) {
    return NextResponse.redirect('/')
  }

  const memory: Memory = await getMemoryById(id, token)

  return (
    <div className="flex flex-col gap-10 space-y-4 p-8">
      <BackwardLink url="/" text="Voltar à timeline"></BackwardLink>

      <TimerDash time={memory.createdAt} />

      <MediaViewer url={memory.coverUrl} fullViewer />

      <p className="text-lg leading-relaxed text-gray-100">{memory.content}</p>
    </div>
  )
}
