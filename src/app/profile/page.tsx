import { Metadata } from "next"
import Header from "@/components/Header"
import { getUserData, onlyLoggedIn } from "@/services/server/auth"
import Alert from '@mui/material/Alert';
import moment from 'moment'
import 'moment/locale/pt-br'
import { Wallet } from "@mercadopago/sdk-react";
import PaymentScreen from "@/components/PaymentScreen";
import CreatePayment from "@/components/CreatePayment";
moment.locale('pt-br')

export const metadata: Metadata = {
    title: 'Meu perfil - UTD'
}

export default async function ProfilePage() {
    onlyLoggedIn()
    const user = await getUserData()
    const now = new Date()

    const due_date = new Date(user.user!.authorized_until!)
    const hasUserPaid = now < due_date ? true : false

    return (<>
        <Header />
        <div className="container mt-5">
            {!hasUserPaid && <div className="flex flex-col gap-3">
                <Alert severity="error">Sua assinatura venceu {moment(due_date).fromNow()}! Realize o pagamento novamente e tenha acesso aos artigos.</Alert>
                <Alert severity="error">Clique no botão abaixo e faça o pagamento através do MercadoPago!</Alert>
                <CreatePayment />
            </div>}
        </div>
    </>)
}