import { useVideos } from '@/data/videos'
import VideoDisplay from './video-display'

type FeaturedEducatorSectionProps = {
  educatorId: string
  educatorName: string
}
export default function FeaturedEducatorSection({
  educatorId,
  educatorName,
}: FeaturedEducatorSectionProps) {
  const { data: { videos = [] } = {} } = useVideos(educatorId)
  return (
    <section className="px-4 py-12 mx-auto max-w-6xl">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <h2 className="text-3xl font-bold">
            Featured Educator: {educatorName}
          </h2>
          <p className="text-muted-foreground">
            Explore the latest educational videos from {educatorName}.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoDisplay key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  )
}
