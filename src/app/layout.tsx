import Header from '@/components/Header'
import './globals.css'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://www.wolterskluwer.com/-/media/project/wolterskluwer/oneweb/www/images/logo/favicon.png?rev=939e1a5cbc2d4c8ca7d3dfda28250865" rel="shortcut icon" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
