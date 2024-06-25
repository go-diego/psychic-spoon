import { Video, getVideo } from '@/data/videos'
import {
  getYouTubeOembedData,
  getYouTubeVideoIdFromOembedData,
  isYouTubeUrl,
  makeYouTubeEmbedUrl,
} from '@/lib/utils'
import { GetServerSidePropsContext } from 'next'
import CommentsSection from '@/components/comments-section'

export default function VideoPage({
  video: { title, id: videoId, description, video_url },
  ytVideoId,
}: {
  video: Video
  ytVideoId: string | null
}) {
  return (
    <div className="p-4 py-8 mx-auto max-w-6xl w-full flex flex-col gap-8 h-full">
      <div className="flex-col sm:flex-row flex gap-4 flex-1">
        <div className="w-full sm:w-[60%] flex flex-col gap-4">
          <div className="aspect-video">
            {ytVideoId ? (
              <iframe
                id={ytVideoId}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="YouTube video player"
                width="100%"
                height="100%"
                src={makeYouTubeEmbedUrl(ytVideoId)}
              />
            ) : (
              <video src={video_url} controls className="w-full h-full" />
            )}
          </div>
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="break-words">{description}</p>
        </div>
        <div className="flex-1 h-full">
          <CommentsSection videoId={videoId} />
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const { videoId } = params as { videoId: string }
  const { video } = await getVideo(videoId)

  const isYoutubeVideo = isYouTubeUrl(video.video_url)

  let ytVideoId = null
  if (isYoutubeVideo) {
    const ytVideoData = await getYouTubeOembedData(video.video_url)
    ytVideoId = getYouTubeVideoIdFromOembedData(ytVideoData.html)
  }

  return {
    props: {
      video,
      ytVideoId,
    },
  }
}
