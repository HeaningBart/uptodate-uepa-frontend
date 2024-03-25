import type { Metadata } from 'next'
import './globals.css'
import Test from '@/components/Test'
import Header from '@/components/header'
import { Input } from '@/components/ui/input'
import { Alert } from '@/components/ui/alert'

export const metadata: Metadata = {
  title: 'UpToDate do Pará - Início',
  description: 'Artigos por preços acessíveis e com qualidade garantida.',
}

export default function Home() {
  return (
    <main>
      <Header />
      <div className="min-h-[80vh] container flex flex-col items-center justify-center">
        <form className="w-full" action="/contents/search">
          <Input
            name="search"
            className="bg-[#f1f1f1] dark:bg-[#101010]"
            placeholder="Pesquise por um artigo aqui..."
          />
        </form>
      </div>
    </main>
  )
}
