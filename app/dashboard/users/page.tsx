import { Metadata } from 'next'
import UsersHeader from './components/UsersHeader'
import UsersTable from './components/UsersTable'
import { UsersDashboardContextProvider as ContextProvider } from './components/Context'

export const metadata: Metadata = {
  title: 'Usuários - UpToDate do Pará',
}

const UsersDashboard = () => {
  return (
    <>
      <ContextProvider>
        <div className="container space-y-2">
          <UsersHeader />
          <UsersTable />
        </div>
      </ContextProvider>
    </>
  )
}
export default UsersDashboard
