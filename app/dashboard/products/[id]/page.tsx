import { Metadata } from 'next'
import { EditBody } from './components'

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}): Promise<Metadata> {
  return {
    title: `Editing ${id} - UpToDate do Pará`,
  }
}

export default async function AnnouncementEditPage({
  params: { id },
}: {
  params: { id: string }
}) {
  return (
    <div className="container px-5 min-h-screen">
      <EditBody />
    </div>
  )
}
