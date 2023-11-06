'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation'
import { createPayment } from "@/services/marketplace";

const CreatePayment = () => {

    const router = useRouter();

    async function createSubscription() {
        const preference = await createPayment()
        router.push('/payments/' + preference.data.id)
    }




    return (
        <div className="flex flex-row items-center justify-center">
            <button className="bg-blue-600 px-8 py-2 text-gray-50 font-roboto" onClick={createSubscription}>
                Realizar assinatura com MercadoPago   <FontAwesomeIcon icon={faStore} color={'white'} />
            </button>
        </div>
    )
}
export default CreatePayment;