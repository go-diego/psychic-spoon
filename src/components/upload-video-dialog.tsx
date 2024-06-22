import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NewVideoSchema, usePostVideo } from '@/data/videos'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

type UploadVideoDialogProps = {
  trigger: React.ReactNode
  userId: string
}

export default function UploadVideoDialog({
  trigger,
  userId,
}: UploadVideoDialogProps) {
  const { toast } = useToast()

  const onSuccess = () => {
    toast({
      title: 'Video uploaded',
      description: 'Your video has been uploaded successfully.',
    })
  }

  const onError = () => {
    toast({
      title: 'Error',
      description: 'An error occurred while uploading the video.',
      variant: 'destructive',
    })
  }

  const { mutate: postVideo } = usePostVideo(onSuccess, onError)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [isValid, setIsValid] = useState(false)

  const handleUpload = () => {
    const newVideo = {
      title,
      description,
      user_id: userId,
      video_url: videoUrl,
    }
    postVideo(newVideo)
  }

  useEffect(() => {
    setIsValid(
      NewVideoSchema.safeParse({
        title,
        description,
        user_id: userId,
        video_url: videoUrl,
      }).success,
    )
  }, [title, description, userId, videoUrl])

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New video</DialogTitle>
          <DialogDescription>Publish a new video</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="videoUrl">Url</Label>
            <Input
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button disabled={!isValid} type="button" onClick={handleUpload}>
              Upload
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
