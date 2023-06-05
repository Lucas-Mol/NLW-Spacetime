import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Props {
  id: string
}

export function VerMaisLink({ id }: Props) {
  return (
    <Link
      href={{
        pathname: '/memories/view',
        query: { id },
      }}
      className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
    >
      Ler mais
      <ArrowRight className="h-4 w-4" />
    </Link>
  )
}
