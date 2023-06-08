import Image from 'next/image'

interface Props {
  url: string
  fullViewer: boolean
}

export function MediaViewer({ url, fullViewer }: Props) {
  const isImage = /\.(jpg|png|gif)$/.test(url)

  return (
    <>
      {url &&
        (isImage && !fullViewer
          ? imageVideoAspect(url)
          : isImage && fullViewer
          ? imageNoVideoAspect(url)
          : video(url))}
    </>
  )
}

function imageVideoAspect(url: string) {
  return (
    <Image
      src={url}
      width={592}
      height={280}
      className="aspect-video w-full rounded-lg object-cover"
      alt=""
    />
  )
}

function imageNoVideoAspect(url: string) {
  return (
    <Image
      src={url}
      width={592}
      height={280}
      className="w-full rounded-lg object-cover"
      alt=""
    />
  )
}

function video(url: string) {
  return (
    <video
      src={url}
      controls
      className="aspect-video w-full rounded-lg object-cover"
    />
  )
}
