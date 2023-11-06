'use client'
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { PromotionalCode } from "@/types"
import { Website_API } from "@global"
import Link from "next/link"
import { parseCookies } from "nookies"
import { useEffect, useState } from "react"


export default function CodesTable() {


    const [query, setQuery] = useState<string>('')
    const [timer, setTimer] = useState<number | any | null>(setTimeout(() => null, 1000));
    const [codes, setCodes] = useState<PromotionalCode[]>([])

    const handleSearch = async (value: string) => {
        setQuery(value)
        clearTimeout(timer);
        setTimer(setTimeout(async () => {
            const results = await fetcher()
            setCodes(results.data)
        }, 1000))
    }

    useEffect(() => {

        (async () => {
            const results = await fetcher()
            setCodes(results.data)
        })()

    }, [])

    const { '_r': cookie } = parseCookies()

    async function fetcher() {
        const response = await fetch(`${Website_API}/codes?query=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        })
        return (await response.json())
    }


    return (
        <div className="font-roboto flex flex-col gap-3 items-center">
            <div className="flex flex-row gap-3">
                <span className="text-center w-fit uppercase bg-blue-600 px-4 py-2 text-gray-50 rounded-md shadow-md">Lista de códigos promocionais</span>
                <Link href="/admin/codes/create">
                    <button className="bg-green-600 px-4 py-2 rounded-sm text-gray-50">
                        Criar código
                    </button>
                </Link>
            </div>
            <Input placeholder="Insira um código..." value={query} onChange={(e) => handleSearch(e.currentTarget.value)} />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Usos restantes</TableHead>
                        <TableHead className="text-right">Desconto</TableHead>
                        <TableHead className="text-right"></TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {codes.map((code) => (
                        <TableRow key={code.id}>
                            <TableCell className="font-medium">{code.id}</TableCell>
                            <TableCell>{code.slug}</TableCell>
                            <TableCell>{code.can_be_used}</TableCell>
                            <TableCell className="text-right">{code.discount}</TableCell>
                            <TableCell className="text-right">
                                <Link href={`/admin/codes/${code.id}`}>
                                    <button className="bg-blue-600 rounded-md px-4 py-2 text-gray-50">
                                        Editar
                                    </button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}