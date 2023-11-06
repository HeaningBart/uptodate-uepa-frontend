'use client'
import { Wallet } from "@mercadopago/sdk-react";

const PaymentScreen = ({ preference_id }: { preference_id: string }) => {
    return (
        <>
            <Wallet initialization={{ preferenceId: preference_id }} locale="pt-BR" />
        </>
    )
}
export default PaymentScreen;