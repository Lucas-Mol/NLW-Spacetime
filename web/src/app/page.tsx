// Components
import { EmptyMemories } from '@/components/EmptyMemories'
import { MemoriesTimeline } from '@/components/MemoriesTimeline'

import { getAllMemoriesByUser } from '@/lib/memoriesApi'
import { Memory } from '@/lib/Memory'
import { cookies } from 'next/headers'

export default async function Home() {
  const token = cookies().get('token')?.value

  const isAuthenticated = !!token

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const memories: Memory[] = await getAllMemoriesByUser(token)

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return <MemoriesTimeline memories={memories} />
}
