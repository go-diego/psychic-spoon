import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { useVideos } from '@/data/videos'
import Content from './content'
import VideoDisplay from './video-display'

type VideosTabsProps = {
  userId: string
}

export default function VideosTabs({ userId }: VideosTabsProps) {
  const [tab, setTab] = useState('published')
  const { data: { videos = [] } = {}, isLoading } = useVideos(
    userId,
    tab === 'published',
  )

  return (
    <Tabs onValueChange={setTab} defaultValue="published">
      <TabsList className="w-full justify-start bg-slate-200">
        <TabsTrigger value="published">Published</TabsTrigger>
        <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="published">
        <Content
          loading={isLoading}
          empty={!isLoading && videos.length === 0}
          emptyMessage="No published videos."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <VideoDisplay key={video.id} video={video} />
            ))}
          </div>
        </Content>
      </TabsContent>
      <TabsContent value="scheduled">No scheduled videos.</TabsContent>
      <TabsContent value="archived">No archived videos.</TabsContent>
    </Tabs>
  )
}
