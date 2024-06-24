import { ScrollArea } from '@/components/ui/scroll-area'
import VideoComment from './video-comment'
import { useComments } from '@/data/videos'
import CommentInput from './comment-input'
import Content from './content'

type CommentsSectionProps = {
  videoId: string
}

export default function CommentsSection({ videoId }: CommentsSectionProps) {
  const { data: { comments = [] } = {}, isLoading } = useComments(videoId)

  return (
    <section className="flex flex-col h-full">
      <h2 className="text-xl font-bold">Comments</h2>
      <div className=" border-b-2 py-4">
        <CommentInput videoId={videoId} />
      </div>
      <ScrollArea className="w-full h-[calc(100vh-300px)]">
        <Content
          className="flex flex-col gap-4 py-10"
          loading={isLoading}
          empty={!isLoading && comments.length === 0}
          emptyMessage="No comments."
        >
          {comments.map((comment) => (
            <VideoComment key={comment.id} comment={comment} />
          ))}
        </Content>
      </ScrollArea>
    </section>
  )
}
