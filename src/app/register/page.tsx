import { Metadata } from "next"
import { onlyGuest } from "@/services/server/auth"
import Header from "@/components/Header"
import RegisterForm from "./components/register-form"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
    title: "Registrar - UTD",
    description: "Faça seu registro agora mesmo.",
}

export default function AuthenticationPage() {


    onlyGuest()

    return (
        <>
            <Header />
            <div className="container my-5 flex justify-center items-center min-h-[80vh]">
                <RegisterForm />
            </div>
            <Footer />
        </>
    )
}