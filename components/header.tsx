'use client'

import { SearchIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import useRoutes from '@/hooks/use-routes'
import useAuthModal from '@/hooks/use-auth-modal'
import { Button } from '@/components/ui/button'
import AccountMenu from './account-menu'

const Header = () => {
  const routes = useRoutes()
  const { data, status } = useSession()
  const authModal = useAuthModal()

  const handleClick = () => {
    if (!authModal.isOpen) {
      authModal.onOpen()
    }
  }

  return (
    <div className="w-full h-16 flex flex-row items-center">
      <Link href="/" className="mr-4">
        <Image
          width={42}
          height={42}
          src="https://github.com/vanthom04.png"
          alt="Logo"
        />
      </Link>
      <nav className="hidden sm:flex sm:gap-x-4">
        {routes.map((route) => (
          <Link
            key={route.label}
            href={route.slug ? `/list/${route.href}` : route.href}
            className={clsx('text-[#d5d6d7] font-normal text-sm lg:text-base hover:text-[#b3b3b3] transition-colors duration-200', route.active && 'font-medium text-white hover:text-white')}
          >
            {route.label}
          </Link>
        ))}
      </nav>
      <div className="flex flex-row items-center justify-center gap-x-6 ml-auto">
        <Link href="/search">
          <SearchIcon className="w-6 h-6 text-white sm:hover:text-[#05dbf3] transition-colors duration-200" />
        </Link>
        {status !== 'loading' && data?.user ? (
          <AccountMenu
            name={data.user.name ?? ''}
            email={data.user.email ?? ''}
            image={data.user.image ?? ''}
          />
        ) : (
          <Button
            type="button"
            variant="secondary"
            onClick={handleClick}
          >
            Đăng nhập
          </Button>
        )}
      </div>
    </div>
  )
}

export default Header
