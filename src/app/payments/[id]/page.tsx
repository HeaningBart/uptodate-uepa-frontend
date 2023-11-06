import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PaymentScreen from "@/components/PaymentScreen";
import { Wallet } from "@mercadopago/sdk-react";
import { Alert } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Realizar pagamento - UTD'
}


const PaymentPage = ({ params }: { params: { id: string } }) => {


    return (
        <>
            <Header />
            <div className="container flex flex-col items-center justify-center min-h-[80vh]">
                <div className="grid grid-cols-3 gap-8 w-full">
                    <div className="col-span-3 lg:col-span-2 flex flex-col gap-3">
                        <Alert severity="info">A assinatura é efetivada imediatamente após o pagamento.</Alert>
                        <Alert severity="warning">Quaisquer erros contatar o desenvolvedor.</Alert>

                    </div>
                    <div className="col-span-3 lg:col-span-1">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row justify-between items-center">
                                <span>Assinatura de 1 mês - UTD</span>
                            </div>
                            <PaymentScreen preference_id={params.id} />
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default PaymentPage;