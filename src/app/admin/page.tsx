import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";
import UsersTable from "./components/users-table";
import CodesTable from "./components/codes-table";

export const metadata: Metadata = {
    title: 'Painel de administração - UTD'
}


const AdminPage = () => {
    return (
        <>
            <Header />
            <div className="container flex flex-col gap-4 my-4 min-h-screen">
                <UsersTable />
                <CodesTable />
            </div>
            <Footer />
        </>
    )
}
export default AdminPage;