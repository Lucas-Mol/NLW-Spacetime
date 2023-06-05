import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

interface Props {
  url: string
  text: string
}

export function BackwardLink({ url, text }: Props) {
  return (
    <Link
      href={url}
      className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
    >
      <ChevronLeft className="h-4 w-4" />
      {text}
    </Link>
  )
}
