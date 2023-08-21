import './globals.css'
import { Manrope } from 'next/font/google'
import { Providers } from './providers'

const manrope = Manrope({weight: ['400', '700'], subsets: ['latin'] })

export const dynamic = 'force-dynamic'

export const metadata = {
  title: '*MNTodo | Todo List App',
  description: 'Generado con Next.js y Supabase',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manrope.className}>
      <Providers>

      {children}
      </Providers>
      </body>
    </html>
  )
}
