import Header from '@/components/header'
import Link from 'next/link'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="relative">
        <div className="w-[256px] hidden lg:block min-h-[calc(100vh-64px)] bg-foreground p-4 shadow-md fixed">
          <ul className="p-2 text-primary text-sm font-bold divide-y-2">
            <li className="p-2">
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="p-2">
              <Link href="/dashboard/products">Produtos</Link>
            </li>
            <li className="p-2">
              <Link href="/dashboard/users">Usuários</Link>
            </li>
          </ul>
        </div>
        <div className="pl-64 shrink-0 w-full pt-4">{children}</div>
      </div>
    </>
  )
}
