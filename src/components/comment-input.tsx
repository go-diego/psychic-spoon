import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { usePostComment } from '@/data/videos'

type CommentInputProps = {
  videoId: string
}

export default function CommentInput({ videoId }: CommentInputProps) {
  const { toast } = useToast()
  const [text, setText] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  const onSuccess = () => {
    toast({
      title: 'Comment posted',
    })
    setText('')
  }

  const onError = () => {
    toast({
      title: 'Error',
      description: 'An error occurred while posting comment.',
      variant: 'destructive',
    })
  }

  const { mutate: postComment } = usePostComment(onSuccess, onError)

  const handlePostComment = () => {
    postComment({ content: text, video_id: videoId, user_id: 'go_diego' })
  }

  useEffect(() => {
    const textArea = textAreaRef.current
    if (textArea) {
      textArea.style.height = 'auto'
      textArea.style.height = `${textArea.scrollHeight}px`
    }
  }, [text])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  return (
    <div className="flex flex-col gap-2">
      <Textarea
        ref={textAreaRef}
        value={text}
        onChange={handleChange}
        placeholder="Write your comment..."
        rows={1}
        cols={1}
        className="min-h-0 resize-none overflow-hidden"
      />
      <Button disabled={!text} onClick={handlePostComment}>
        Post Comment
      </Button>
    </div>
  )
}
