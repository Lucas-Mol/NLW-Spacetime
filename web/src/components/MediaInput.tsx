import { Camera } from 'lucide-react'

export function MediaInput() {
  return (
    <label
      htmlFor="media"
      className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
    >
      <Camera className="2-4 h-4" />
      Anexar mídia
      <input type="file" id="media" className="invisible w-0" />
    </label>
  )
}
