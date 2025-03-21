import { type Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next'

import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import { SessionProvider } from '@/components/providers/session-provider'

import '@/app/globals.css'

const roboto = Roboto({
  subsets: ['vietnamese'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Watch Movies',
  description: 'Watch Movies'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <SessionProvider>
          <NuqsAdapter>
            <div className="max-w-6xl mx-auto">
              <Header />
              <main>{children}</main>
            </div>
            <Toaster />
          </NuqsAdapter>
        </SessionProvider>
      </body>
    </html>
  )
}
