import UserCard from '@/components/user-card'
import VideosTabs from '@/components/videos-tabs'
import { User } from '@/data/user'
import { capitalize } from 'lodash'
import { GetServerSidePropsContext } from 'next'

export default function Profile({ user }: { user: User }) {
  return (
    <div className="py-10">
      <section className="p-4 py-8 mx-auto max-w-6xl bg-slate-200 rounded">
        <UserCard user={user} />
      </section>

      <section className="px-4 sm:px-0 py-12 mx-auto max-w-6xl">
        <VideosTabs userId={user.id} />
      </section>
    </div>
  )
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const { userId } = params as { userId: string }
  return {
    props: {
      user: {
        id: userId,
        name: capitalize(userId.split('_')[0]),
      },
    },
  }
}
