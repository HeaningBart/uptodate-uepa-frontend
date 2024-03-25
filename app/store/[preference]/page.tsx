import { PreferenceResponse } from 'mercadopago/dist/clients/preference/commonTypes'
import StatusScreenMP from './components/payment-status'
import MercadoPagoWallet from '@/components/mp-wallet'
import Header from '@/components/header'

const PreferencePage = async ({
  params: { preference },
}: {
  params: { preference: string }
}) => {
  const payment: PreferenceResponse = await (
    await fetch(
      `${process.env.LOCAL_API_URL}/preferences/external/${preference}`,
      {
        next: {
          revalidate: 0,
        },
      }
    )
  ).json()

  return (
    <>
      <div>
        <MercadoPagoWallet preferenceId={preference} />
      </div>
    </>
  )
}
export default PreferencePage
