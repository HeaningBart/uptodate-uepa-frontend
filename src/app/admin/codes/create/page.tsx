import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";
import CodeCreationForm from "./components/new-code-form";


export const metadata: Metadata = {
    title: 'Criando código - UTD'
}


const AdminPage = () => {
    return (
        <>
            <Header />
            <div className="container flex flex-col gap-4 my-4 min-h-screen">
                <CodeCreationForm />
            </div>
            <Footer />
        </>
    )
}
export default AdminPage;