import { BackwardLink } from '@/components/BackwardLink'
import { FormNewMemory } from '@/components/FormNewMemory'

export default function NewMemory() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <BackwardLink url="/" text="Voltar à timeline"></BackwardLink>

      <FormNewMemory />
    </div>
  )
}
