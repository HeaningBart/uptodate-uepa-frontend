'use client';

import { Input } from "@/components/ui/input";
import API from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CodeCreationForm() {


    const [slug, setSlug] = useState<string>('')
    const [canBeUsed, setUses] = useState<number>(0)
    const [discount, setDiscount] = useState<string>('')

    const router = useRouter()

    async function createCode() {
        await API.post('/codes/create', {
            slug, canBeUsed, discount
        });
        toast.success('Código criado atualizado!')
        router.push('/admin')

    }

    return (
        <div className="flex flex-col gap-3 items-center justify-center">
            <Input placeholder="Slug" type="text" value={slug} onChange={e => setSlug(e.currentTarget.value)} />
            <Input placeholder="Número de usos" type="number" value={canBeUsed.toString()} onChange={e => setUses(parseInt(e.currentTarget.value))} />
            <Input placeholder="Desconto" type="text" value={discount} onChange={e => setDiscount(e.currentTarget.value)} />
            <button onClick={createCode} className="bg-blue-600 px-4 py-2 text-gray-50">
                Salvar alterações
            </button>
        </div>
    )

}