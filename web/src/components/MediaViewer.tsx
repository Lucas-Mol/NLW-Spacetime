import Image from 'next/image'

interface Props {
  url: string
}

export function MediaViewer({ url }: Props) {
  return (
    <>
      {url &&
        (/\.(jpg|png|gif)$/.test(url) ? (
          <Image
            src={url}
            width={592}
            height={280}
            className="aspect-video w-full rounded-lg object-cover"
            alt=""
          />
        ) : (
          <video
            src={url}
            controls
            className="aspect-video w-full rounded-lg object-cover"
          />
        ))}
    </>
  )
}
