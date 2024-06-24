import { Button } from '@/components/ui/button'
import { useUser } from '@/data/user'
import UploadVideoDialog from './upload-video-dialog'

type UserCardProps = {
  userId: string
}

export default function UserCard({ userId }: UserCardProps) {
  const { user, isLoggedIn, logout } = useUser()
  const isOwner = isLoggedIn && user.id === userId
  return (
    <div className="flex gap-4">
      <img
        className="h-32 w-32 rounded-full border border-slate-400"
        src="/pfp-placeholder.png"
      />
      <div className="flex flex-col gap-1 justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">{isOwner ? user.name : userId}</h1>
          {isOwner && (
            <>
              <p className="text-muted-foreground">User ID: {userId}</p>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </div>
        {isOwner && userId && (
          <UploadVideoDialog
            userId={userId}
            trigger={<Button size="sm">Upload Video</Button>}
          />
        )}
      </div>
    </div>
  )
}
