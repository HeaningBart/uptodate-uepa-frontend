'use client'
import { initMercadoPago } from '@mercadopago/sdk-react'

const MercadoPago = () => {
  initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!)
  return <></>
}
export default MercadoPago
