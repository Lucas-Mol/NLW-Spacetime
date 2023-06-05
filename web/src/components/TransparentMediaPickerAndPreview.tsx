'use client' // to send javascript to client

import { ChangeEvent, useState } from 'react'

interface Props {
  mediaInputId: string
}

interface Preview {
  mime: string
  url: string
}

export function TransparentMediaPickerAndPreview(props: Props) {
  const [preview, setPreview] = useState<Preview | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const file = files[0]

    setPreview(getPreview(file))
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        name="coverUrl"
        id={props.mediaInputId}
        className="invisible h-0 w-0"
        accept="image/*,video/*"
      />
      {preview &&
        (preview.mime.includes('image') ? (
          // eslint-disable-next-line
          <img
            src={preview.url}
            alt=""
            className="aspect-video w-full rounded-lg object-cover"
          />
        ) : preview.mime.includes('video') ? (
          <video
            src={preview.url}
            controls
            className="aspect-video w-full rounded-lg object-cover"
          />
        ) : null)}
    </>
  )
}

function getPreview(file: File) {
  let preview: Preview = {
    mime: '',
    url: '',
  }
  if (file.type.startsWith('image/')) {
    preview = {
      mime: 'image',
      url: URL.createObjectURL(file),
    }
  } else if (file.type.startsWith('video/')) {
    preview = {
      mime: 'video',
      url: URL.createObjectURL(file),
    }
  }
  return preview
}
