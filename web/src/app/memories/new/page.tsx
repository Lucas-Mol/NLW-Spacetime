import { BackwardLink } from '@/components/BackwardLink'
import { MediaInput } from '@/components/MediaInput'
import { MemoryContentTextArea } from '@/components/MemoryContentTextArea'
import { PublicCheckbox } from '@/components/PublicCheckbox'

export default function NewMemory() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <BackwardLink url="/" text="Voltar à timeline"></BackwardLink>

      <form className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-4">
          <MediaInput />

          <PublicCheckbox />
        </div>

        <MemoryContentTextArea />
      </form>
    </div>
  )
}
