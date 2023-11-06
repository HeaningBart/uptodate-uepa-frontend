'use client';

import { signUpRequest } from "@/services/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";


const LoginForm = () => {

    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirm] = useState<string>('');


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        toast(`Estamos te registrando e iniciando sua sessão...`)
        try {
            const token = await signUpRequest(email.trim(), password.trim());
            toast.success(`Registrado com sucesso! Estamos te redirecionando pra página inicial!`)
            router.push('/api/login?token=' + token.token)
        } catch (error: any) {
            if (error && error.response && error.response.data) {
                error.response.data.errors.forEach((error: any) => toast.error(error.message))
            }
        }

    }

    return (
        <form className="flex flex-col gap-8 bg-gray-100 shadow-md px-10 py-4 lg:max-w-[30vw] flex-grow" onSubmit={(e) => handleSubmit(e)}>
            <h5 className="font-bold text-xl text-zinc-950">Registrar-se</h5>
            <div className="flex flex-col gap-2">
                <label className="font-bold text-zinc-950">E-mail de utilização</label>
                <input className="bg-white" id="email" type="email" value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)} />            </div>
            <div className="flex flex-col gap-2">
                <label className="font-bold text-zinc-950">Palavra-passe</label>
                <input className="bg-white" id="password" type="password" value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-bold text-zinc-950">Confirmar palavra-passe</label>
                <input className="bg-white" id="password" type="password" value={confirmPassword}
                    onChange={(e) => setConfirm(e.currentTarget.value)} />
            </div>
            <button type="submit" className="w-full py-2 px-4 text-gray-50 bg-orange-400">Registrar-se</button>
            <div className="flex items-center justify-center relative">
                <div className="h-[1px] w-full border-t-0 bg-gray-400 opacity-100 dark:opacity-50 absolute" />
                <span className="text-neutral-950 bg-gray-100 p-2 z-10 tracking-wide">OU</span>
            </div>
            <Link href="/login">
                <button className="w-full py-2 px-4 text-gray-50 bg-blue-500">Iniciar sessão</button>
            </Link>
        </form>
    )
}
export default LoginForm;