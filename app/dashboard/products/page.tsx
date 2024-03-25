import { Metadata } from 'next'
import {
  AnnouncementsHeader as Header,
  AnnouncementsTable as Table,
  AnnouncementsDashboardContextProvider as ContextProvider,
} from './components'

export const metadata: Metadata = {
  title: 'Products - UpToDate do Pará',
}

const ProductsDashboardPage = () => {
  return (
    <ContextProvider>
      <div className="min-h-screen container space-y-2">
        <Header />
        <Table />
      </div>
    </ContextProvider>
  )
}
export default ProductsDashboardPage
