import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getUser } from "@/services/server/auth";
import { Metadata } from "next";
import ProfileForm from "./components/profile-form";


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const user = await getUser(params.id)
    return {
        title: `Editando - ${user.id} `
    }

}


export default async function UserPage({ params }: { params: { id: string } }) {

    const user = await getUser(params.id)


    return (
        <>
            <Header />
            <div className="container flex flex-col gap-4 my-4 min-h-screen">
                <ProfileForm user={user} />
            </div>
            <Footer />
        </>

    )
}