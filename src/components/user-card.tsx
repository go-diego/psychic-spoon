import { Button } from '@/components/ui/button'
import { User } from '@/data/user'
import UploadVideoDialog from './upload-video-dialog'

type UserCardProps = {
  user: User
}

export default function UserCard({ user: { id, name } }: UserCardProps) {
  return (
    <div className="flex gap-4">
      <img
        className="h-32 w-32 rounded-full border border-slate-400"
        src="/pfp-placeholder.png"
      />
      <div className="flex flex-col gap-1 justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-muted-foreground">User ID: {id}</p>
        </div>
        <UploadVideoDialog
          userId={id}
          trigger={<Button size="sm">Upload Video</Button>}
        />
      </div>
    </div>
  )
}
