import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { format, formatDistanceToNow } from 'date-fns'
import { Video } from '@/data/videos'
import { getYouTubeOembedData, isYouTubeUrl } from '@/lib/utils'

type VideoDisplayProps = {
  video: Video
}

const DEFAULT_THUMBNAIL = '/thumbnail-placeholder.svg'

export default function VideoDisplay({
  video: { video_url, title, description, id, created_at },
}: VideoDisplayProps) {
  const isYoutubeVideo = isYouTubeUrl(video_url)

  const { data: oembedData } = useQuery({
    queryKey: ['youtube-oembed', video_url],
    queryFn: () => getYouTubeOembedData(video_url),
    enabled: isYoutubeVideo,
  })

  return (
    <div className="relative border-2 rounded overflow-auto group border-slate-200">
      <Link
        href={`/video/${id}`}
        className="absolute inset-0 z-10"
        prefetch={false}
      >
        <span className="sr-only">View Video</span>
      </Link>
      {isYoutubeVideo ? (
        <img
          src={
            isYoutubeVideo
              ? oembedData?.thumbnail_url ?? DEFAULT_THUMBNAIL
              : DEFAULT_THUMBNAIL
          }
          alt="Video Thumbnail"
          width={400}
          height={225}
          className="object-cover w-full aspect-video group-hover:opacity-80 transition-opacity"
        />
      ) : video_url ? (
        <video src={video_url} className=" aspect-video" />
      ) : (
        <img
          src={DEFAULT_THUMBNAIL}
          alt="Video Thumbnail"
          width={400}
          height={225}
          className="object-cover w-full aspect-video group-hover:opacity-80 transition-opacity"
        />
      )}
      <div className="mt-3 space-y-1 p-1">
        <h3 className="font-bold">{title}</h3>
        <p className="text-muted-foreground line-clamp-2">{description}</p>
        <p className="text-muted-foreground text-xs">
          {formatDistanceToNow(new Date(created_at), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  )
}
