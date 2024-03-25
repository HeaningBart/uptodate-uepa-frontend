import type { Metadata } from 'next'
import './globals.css'
import Test from '@/components/Test'
import Header from '@/components/header'
import { Input } from '@/components/ui/input'
import { getUserData } from '@/services/server'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { get_time_diff } from '@/lib/utils'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'UpToDate do Pará - Início',
  description: 'Artigos por preços acessíveis e com qualidade garantida.',
}

export default async function Home() {
  const user = await getUserData()

  return (
    <div className="min-h-[80vh] container flex flex-col items-center justify-center gap-3">
      <Alert className="text-primary">
        <AlertTitle>Opa!</AlertTitle>
        <AlertDescription>
          {`Seu benefício acaba ${get_time_diff(
            user.user?.authorizedUntil!
          )}. `}
          <Link className="inline text-blue-600 font-bold" href="/store">
            Renove agora mesmo clicando aqui!
          </Link>
        </AlertDescription>
      </Alert>
      <form className="w-full" action="/contents/search">
        <Input
          name="search"
          className="bg-[#f1f1f1] dark:bg-[#101010]"
          placeholder="Pesquise por um artigo aqui..."
        />
      </form>
    </div>
  )
}
