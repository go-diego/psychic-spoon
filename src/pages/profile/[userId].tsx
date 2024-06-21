import VideosTabs from '@/components/videos-tabs'
import { capitalize } from 'lodash'
import { GetServerSidePropsContext } from 'next'

type User = {
  id: string
  name: string
}

export default function Profile({ user: { id, name } }: { user: User }) {
  return (
    <div className="py-10">
      <section className="p-4 py-8 mx-auto max-w-6xl bg-slate-200 rounded">
        <div className="flex gap-4">
          <img
            className="h-20 w-20 rounded-full border border-slate-400"
            src="/thumbnail-placeholder.svg"
          />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="text-muted-foreground">User ID: {id}</p>
          </div>
        </div>
      </section>

      <section className="py-12 mx-auto max-w-6xl">
        <VideosTabs userId={id} />
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
