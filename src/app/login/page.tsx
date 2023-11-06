import { Metadata } from "next"
import { onlyGuest } from "@/services/server/auth"
import Header from "@/components/Header"
import LoginForm from "./components/login-form"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
    title: "Iniciar sessão - UTD",
    description: "Faça login agora mesmo.",
}

export default function AuthenticationPage() {


    onlyGuest()

    return (
        <>
            <Header />
            <div className="container my-5 flex justify-center items-center min-h-[80vh]">
                <LoginForm />
            </div>
            <Footer />
        </>
    )
}