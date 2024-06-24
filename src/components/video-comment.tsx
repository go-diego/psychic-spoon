import type { Comment } from '@/data/videos'
import { formatDistanceToNow } from 'date-fns'
import { CircleUser } from 'lucide-react'

type VideoCommentProps = {
  comment: Comment
}

export default function VideoComment({
  comment: { content, user_id, created_at },
}: VideoCommentProps) {
  return (
    <div className="flex items-start gap-4">
      <span>
        <CircleUser />
      </span>
      <div className="grid gap-1">
        <div className="flex items-center gap-2">
          <div className="font-medium">{user_id}</div>
          <div className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
          </div>
        </div>
        <p className="text-muted-foreground">{content}</p>
      </div>
    </div>
  )
}
