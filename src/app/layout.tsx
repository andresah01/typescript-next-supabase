import { Inter, Roboto } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ weight: ['300', '400'], subsets: ['latin'] })

import '../app/page.css'
import styles from './page.module.css'

export const metadata = {
  title: 'Learning Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={roboto.className}>
        <main className={styles.main}>
          {children}
        </main>
      </body>
    </html>
  )
}

