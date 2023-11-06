import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { NotificationsToast } from '@/components/ReactToast';
import { Providers } from '@/store/provider';
import { isLoggedIn, getUserData } from '@/services/server/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Preloader from './Preloader';
import MercadoPago from '@/components/MercadoPago';


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const user = isLoggedIn() ? await getUserData() : {
    isLoggedIn: false,
    user: undefined
  }

  if (!user.isLoggedIn) {
    const cookieStore = cookies()
    const auth_cookie = cookieStore.get('_r');
    if (auth_cookie) redirect('/logout')
  }


  return (
    <html lang="en">
      <head>
        <script src="https://sdk.mercadopago.com/js/v2"></script>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto" />
        <link href="https://www.wolterskluwer.com/-/media/project/wolterskluwer/oneweb/www/images/logo/favicon.png?rev=939e1a5cbc2d4c8ca7d3dfda28250865" rel="shortcut icon" />
      </head>
      <body>
        <Providers>
          <MercadoPago />
          {children}
          {user && user.isLoggedIn && user.user && <Preloader user={user.user} />}
          <NotificationsToast />
        </Providers>
      </body>
    </html>
  )
}
