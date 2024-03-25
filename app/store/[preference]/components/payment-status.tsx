'use client'
import { StatusScreen } from '@mercadopago/sdk-react'
import { useParams } from 'next/navigation'
const StatusScreenMP = () => {
  const params = useParams()
  return (
    <>
      <StatusScreen
        initialization={{ paymentId: params.preference! as string }}
      />
    </>
  )
}
export default StatusScreenMP
