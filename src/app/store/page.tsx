import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";
import StoreCards from "./components/cards";
import { onlyLoggedIn, getUserData } from "@/services/server/auth";
import { Alert } from "@mui/material";
import moment from "moment";
import 'moment/locale/pt-br'

moment.locale('pt-br')


export const metadata: Metadata = {
    title: 'Loja - UTD'
}

const StorePage = async () => {
    onlyLoggedIn()
    const user = await getUserData()
    const now = new Date()

    const due_date = new Date(user.user!.authorized_until!)
    const hasUserPaid = now < due_date ? true : false
    return (
        <>
            <Header />
            <div className="container min-h-screen">
                {!hasUserPaid &&
                    <>
                        <div className="flex flex-col gap-3 mt-5">
                            <Alert severity="error">Sua assinatura venceu {moment(due_date).fromNow()}! Realize o pagamento novamente e tenha acesso aos artigos.</Alert>
                            <Alert severity="error">Clique no botão abaixo e faça o pagamento através do MercadoPago!</Alert>
                        </div>
                        <StoreCards />
                    </>
                }
                {hasUserPaid &&
                    <div className="mt-5">
                        <Alert severity="success">
                            Você tem uma assinatura ativa até {moment(due_date).format('LLLL')}, volte depois!
                        </Alert>
                    </div>}
            </div>
            <Footer />
        </>
    )
}
export default StorePage;