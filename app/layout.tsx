import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import Header from '@/components/header'
import AuthContext from '@/context/auth-context'
import ModalProvider from '@/providers/modal-provider'
import ToasterProvider from '@/providers/toaster-provider'
import '@/app/globals.css'

const font = Roboto({ subsets: ['vietnamese'], weight: ['300', '400', '500', '700'] })

export const metadata: Metadata = {
  title: 'Watch Movies',
  description: 'Watch Movies'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true} className={`${font.className} antialiased`}>
        <AuthContext>
          <ModalProvider />
          <ToasterProvider />
          <div className="px-4 sm:px-10 md:px-12 lg:px-16 xl:px-24">
            <Header />
            <div className="py-4">{children}</div>
          </div>
        </AuthContext>
      </body>
    </html>
  )
}
