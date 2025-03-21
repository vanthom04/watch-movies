'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import { useRoutes } from '@/hooks/use-routes'
import { Button } from '@/components/ui/button'

import { UserButton } from './user-button'
import { AuthModal } from './auth/auth-modal'

export const Header = () => {
  const routes = useRoutes()
  const { data: session } = useSession()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  return (
    <>
      <AuthModal isOpen={isAuthModalOpen} onClose={setIsAuthModalOpen} />
      <div className="w-full h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-x-4">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={36} height={36} />
          </Link>
          <nav className="flex items-center gap-x-4">
            {routes.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => {
                  if (item.href === '/favorites' && !session) {
                    toast.error('Vui lòng đăng nhập để xem yêu thích')
                  }
                }}
                className={cn('text-gray-300 hover:text-white', item.active && 'text-white')}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-x-4">
          <Link href="/search" className="text-white hover:text-gray-300">
            <SearchIcon className="size-6" />
          </Link>
          {session ? (
            <UserButton />
          ) : (
            <Button
              variant="secondary"
              className="cursor-pointer"
              onClick={() => setIsAuthModalOpen(true)}
            >
              Đăng nhập
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
