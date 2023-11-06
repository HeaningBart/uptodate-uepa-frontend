
import { checkAuth } from "@/services/server/auth";


export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {


    await checkAuth()

    return (
        <>

            {children}

        </>
    )
}