import { Metadata } from "next";
import Reload from "./components/reload";

export const metadata: Metadata = {
    title: 'Autorizando - UTD'
}

export default async function AuthPage() {
    return (
        <>
            <Reload />
        </>
    )
}