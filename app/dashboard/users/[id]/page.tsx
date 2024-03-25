import { getUser } from '@/services/server'
import { Metadata } from 'next'
import { SingleUserContextProvider as ContextProvider } from './components/Context'
import UserProfileForm from './components/ProfileForm'

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}): Promise<Metadata> {
  const user = await getUser(id)

  return {
    title: `Editando ${user.email} - UpToDate do Pará`,
  }
}

const SingleUserPage = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const user = await getUser(id)

  return (
    <ContextProvider user={user}>
      <div className="min-h-screen container px-5 space-y-4">
        <UserProfileForm />
      </div>
    </ContextProvider>
  )
}
export default SingleUserPage
