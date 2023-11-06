'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { ImageUTDResponse, PromotionalCode, User } from "@/types"
import { Website_API } from "@global"
import { url } from "inspector"
import { parseCookies } from "nookies"
import useSWR from "swr"
import Link from "next/link"

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

export default function UsersTable() {


    const [query, setQuery] = useState<string>('')
    const [timer, setTimer] = useState<number | any | null>(setTimeout(() => null, 1000));
    const [users, setUsers] = useState<User[]>([])

    const handleSearch = async (value: string) => {
        setQuery(value)
        clearTimeout(timer);
        setTimer(setTimeout(async () => {
            const results = await fetcher()
            setUsers(results.data)
        }, 1000))
    }

    useEffect(() => {

        (async () => {
            const results = await fetcher()
            setUsers(results.data)
        })()

    }, [])

    const { '_r': cookie } = parseCookies()

    async function fetcher() {
        const response = await fetch(`${Website_API}/users?query_string=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        })
        return (await response.json())
    }


    return (
        <div className="font-roboto flex flex-col gap-3 items-center">
            <span className="text-center w-fit uppercase bg-blue-600 px-4 py-2 text-gray-50 rounded-md shadow-md">Lista de usuários</span>
            <Input placeholder="Insira um e-mail..." value={query} onChange={(e) => handleSearch(e.currentTarget.value)} />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>E-mail</TableHead>
                        <TableHead>Autorizado até</TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.length > 0 && users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.authorized_until}</TableCell>
                            <TableCell className="text-right">
                                <Link href={`/admin/users/${user.id}`}>
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