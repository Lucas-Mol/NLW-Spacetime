import { Camera } from 'lucide-react'

interface Props {
  mediaInputId: string
}

export function MediaInput(props: Props) {
  return (
    <label
      htmlFor={props.mediaInputId}
      className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
    >
      <Camera className="2-4 h-4" />
      Anexar mídia
    </label>
  )
}
