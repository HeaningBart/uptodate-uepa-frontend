'use client';
import { MP_PUBLIC_KEY } from '@global';
import { initMercadoPago } from '@mercadopago/sdk-react'


const MercadoPago = () => {

    initMercadoPago(MP_PUBLIC_KEY);

    return (
        <>
        </>
    )
}
export default MercadoPago;