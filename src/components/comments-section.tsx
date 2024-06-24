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
    <section>
      <div className="flex flex-col w-full gap-6">
        <h2 className="text-xl font-bold">Comments</h2>
        <ScrollArea className="w-full h-[300px]">
          <Content
            className="flex flex-col gap-4"
            loading={isLoading}
            empty={!isLoading && comments.length === 0}
            emptyMessage="No comments."
          >
            {comments.map((comment) => (
              <VideoComment key={comment.id} comment={comment} />
            ))}
          </Content>
        </ScrollArea>
        <div className="sticky bottom-0 sm:static">
          <CommentInput videoId={videoId} />
        </div>
      </div>
    </section>
  )
}
