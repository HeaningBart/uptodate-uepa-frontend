import { Metadata } from "next"
import UserProfileForm from "./components/user-profile-form"
import Header from "@/components/Header"

export const metadata: Metadata = {
    title: 'Meu perfil - UTD'
}

export default function ProfilePage() {
    return (<>
        <Header />
        <UserProfileForm />
    </>)
}