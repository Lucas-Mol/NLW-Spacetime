import Image from 'next/image'

interface Props {
  url: string
  fullViewer: boolean
}

export function MediaViewer({ url, fullViewer }: Props) {
  return (
    <>
      {url &&
        (/\.(jpg|png|gif)$/.test(url) && !fullViewer ? (
          <Image
            src={url}
            width={592}
            height={280}
            className="aspect-video w-full rounded-lg object-cover"
            alt=""
          />
        ) : /\.(jpg|png|gif)$/.test(url) && fullViewer ? (
          <Image
            src={url}
            width={592}
            height={280}
            className="w-full rounded-lg object-cover"
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
