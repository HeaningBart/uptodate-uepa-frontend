'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { createPayment } from '@/services/marketplace'
import { useState } from 'react'

const cards = [
    {
        title: 'Assinatura mensal',
        description: 'Um mês de acesso a todos os recursos do site, incluindo artigos, tabelas, etc.',
        price: 'R$12,00',
        amount: 1
    },
]

const StoreCards = () => {


    const router = useRouter()

    const [code, setCode] = useState<string>('')

    async function createSubscription() {
        const preference = await createPayment({ promotional_code: code })
        router.push('/payments/' + preference.data.id)
    }

    return (<div className="flex flex-col gap-3 min-h-[70vh] justify-center">
        <div className="flex flex-row gap-3 justify-start lg:justify-center items-center overflow-auto">
            {cards.map(item => {
                return (
                    <Card key={item.amount} className="flex-1 shadow-md border-blue-600 border-t-4 justify-center items-center flex flex-col">
                        <CardHeader className="text-center">
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3 justify-center items-center text-gray-400">
                            <span className="bg-green-700 px-8 py-4 shadow-sm text-gray-50 font-roboto">{item.price}</span>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
        <div className="flex flex-row gap-3">
            <Input type="text" value={code} onChange={e => setCode(e.currentTarget.value)} placeholder="Código promocional" />
            <button className="bg-blue-600 px-4 py-2 text-gray-50 font-roboto flex-none" onClick={createSubscription}>Realizar compra</button>
        </div>
    </div>)
}


export default StoreCards;