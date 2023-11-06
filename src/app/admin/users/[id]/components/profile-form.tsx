'use client';

import { Input } from "@/components/ui/input";
import { User } from "@/types";
import { useState } from "react";
import DatePicker from "./calendar";
import API from "@/services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProfileForm({ user }: { user: User }) {

    const [email, setEmail] = useState<string>(user.email)
    const [authorizedUntil, setUntil] = useState<Date>(new Date(user.authorized_until))


    const router = useRouter()


    async function updateUser() {
        await API.put('/users/' + user.id, {
            email, authorizedUntil
        });
        toast.success('Usuário atualizado!')
        router.push('/admin')
    }


    return (
        <>
            <DatePicker date={authorizedUntil} setDate={setUntil} />
            <Input type="email" value={email} onChange={e => setEmail(e.currentTarget.value)} />
            <button onClick={updateUser} className="bg-blue-600 px-4 py-2 text-gray-50">
                Salvar alterações
            </button>
        </>
    )
}