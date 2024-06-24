import UserCard from '@/components/user-card'
import VideosTabs from '@/components/videos-tabs'
import { GetServerSidePropsContext } from 'next'

export default function Profile({ userId }: { userId: string }) {
  return (
    <div className="py-10">
      <section className="p-4 py-8 mx-auto max-w-6xl bg-slate-200 rounded">
        <UserCard userId={userId} />
      </section>

      <section className="px-4 sm:px-0 py-12 mx-auto max-w-6xl">
        <VideosTabs userId={userId} />
      </section>
    </div>
  )
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const { userId } = params as { userId: string }
  console.log(userId)
  return {
    props: {
      userId,
    },
  }
}
