import { MediaViewer } from './MediaViewer'
import { TimerDash } from './TimerDash'
import { VerMaisLink } from './VerMaisLink'
import { Memory } from '@/lib/Memory'

interface Props {
  memories: Memory[]
}
export function MemoriesTimeline({ memories }: Props) {
  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <TimerDash time={memory.createdAt} />

            <MediaViewer url={memory.coverUrl} fullViewer={false} />

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
