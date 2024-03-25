import './globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { GeistSans } from 'geist/font/sans'
import { Toaster } from 'sonner'
import Provider from './ThemeProvider'
import MercadoPago from '@/components/mercado-pago'
export default function RootLayout({
  children,
  image,
}: {
  children: React.ReactNode
  image: React.ReactNode
}) {
  return (
    <html
      className={`${GeistSans.className}`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://www.wolterskluwer.com/-/media/project/wolterskluwer/oneweb/www/images/logo/favicon.png?rev=939e1a5cbc2d4c8ca7d3dfda28250865"
          rel="shortcut icon"
        />
      </head>
      <body className="h-full">
        <Provider>
          <MercadoPago />
          <main>{children}</main>
          <Toaster />
          {image}
        </Provider>
      </body>
    </html>
  )
}
