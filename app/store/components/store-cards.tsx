'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Product } from '@/types/mercadopago'
import { useRouter } from 'next/navigation'
import API from '@/services/api'
import { PreferenceResponse } from 'mercadopago/dist/clients/preference/commonTypes'
import { toast } from 'sonner'
import MercadoPagoWallet from '@/components/mp-wallet'

export function StoreCards({ products }: { products: Product[] }) {
  const [value, setValue] = useState<number>(
    products.length > 0 ? products[0].id : 0
  )
  const [preferenceId, setPreference] = useState<string>('')

  const router = useRouter()

  async function createPreference() {
    toast.promise<{ data: PreferenceResponse }>(
      API.post('/preferences', {
        id: value,
      }),
      {
        loading: 'Criando pedido...',
        success: (data) => {
          setPreference(data.data.id!)
          return 'Pedido criado com sucesso!'
        },
        error:
          'Erro ao criar o pedido, entre em contato com o desenvolvedor :(',
      }
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <RadioGroup
        value={value.toString()}
        onValueChange={(e) => setValue(parseInt(e))}
        className="lg:grid-cols-3 text-primary"
      >
        {products &&
          products.length > 0 &&
          products.map((product) => {
            return (
              <div
                key={product.id}
                className="flex flex-col gap-2 p-4 bg-foreground rounded shadow-md text-primary"
              >
                <div className="flex items-center justify-center space-x-2">
                  <RadioGroupItem
                    value={product.id.toString()}
                    id={product.id.toString()}
                  />
                  <Label htmlFor={product.id.toString()}>
                    {product.title} - R${product.unitPrice}
                  </Label>
                </div>
                <div className="line-clamp-3 text-primary p-4 text-center">
                  {product.description}
                </div>
              </div>
            )
          })}
      </RadioGroup>
      {preferenceId == '' && (
        <Button onClick={createPreference} variant={'destructive'}>
          Continuar
        </Button>
      )}
      {preferenceId != '' && <MercadoPagoWallet preferenceId={preferenceId} />}
    </div>
  )
}
