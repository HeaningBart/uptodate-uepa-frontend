'use client';

import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation'


export default function Search() {

    const [term, setTerm] = useState<string>('');


    const router = useRouter();

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        router.push(`/articles?query=${encodeURIComponent(term)}`)
    }

    return (
        <>
            <form className="w-full flex flex-col justify-center items-center gap-3" onSubmit={onSubmit}>
                <Input placeholder="Pesquise algum tema..." className="w-full lg:w-1/2" value={term} onChange={(e) => setTerm(e.currentTarget.value)} />
                <Button type="submit">Pesquisar</Button>
            </form>
        </>
    )


}