'use client'

import { Wallet } from '@mercadopago/sdk-react'
import { useParams } from 'next/navigation'

export default function MercadoPagoWallet({
  preferenceId,
}: {
  preferenceId: string
}) {
  const params = useParams()

  return <Wallet initialization={{ preferenceId }} />
}
