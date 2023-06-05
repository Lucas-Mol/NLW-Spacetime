// Components
import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'

import { MediaViewer } from '@/components/MediaViewer'
import { TimerDash } from '@/components/TimerDash'
import { VerMaisLink } from '@/components/VerMaisLink'

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value

  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: Memory[] = response.data

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <TimerDash time={memory.createdAt} />

            <MediaViewer url={memory.coverUrl} />

            <p className="text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>

            <VerMaisLink id={memory.id} />
          </div>
        )
      })}
    </div>
  )
}
