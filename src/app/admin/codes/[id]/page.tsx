import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Editando - UTD'
}


const AdminPage = () => {
    return (
        <>
            <Header />
            <div className="container flex flex-col gap-4 my-4 min-h-screen">

            </div>
            <Footer />
        </>
    )
}
export default AdminPage;