import Header from '@/components/header'
import type { Metadata } from 'next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'
import { StoreCards } from './components/store-cards'

export const metadata: Metadata = {
  title: 'Loja - UpToDate do Pará',
}

const Component = async () => {
  const plans = await (
    await fetch(`${process.env.LOCAL_API_URL}/products`, {
      next: {
        revalidate: 0,
      },
    })
  ).json()

  return (
    <>
      <div className="flex flex-col min-h-[80vh] container py-8 gap-3 ">
        <Alert className="text-primary">
          <Terminal className="h-4 w-4 text-primary" />
          <AlertTitle>Opa!</AlertTitle>
          <AlertDescription>
            {`Parece que sua assinatura já acabou. Selecione um dos planos abaixo :)`}
          </AlertDescription>
        </Alert>
        <StoreCards products={plans.data} />
      </div>
    </>
  )
}
export default Component
