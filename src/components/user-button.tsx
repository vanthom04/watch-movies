'use client'

import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const UserButton = () => {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-8 rounded-full cursor-pointer">
          <Avatar>
            <AvatarImage src={session?.user?.image || ''} />
            <AvatarFallback>{session?.user?.name?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="pt-1.5 pb-0.5">{session?.user?.name}</DropdownMenuLabel>
        <p className="text-xs font-semibold px-2">{session?.user?.email}</p>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {}}>Tài khoản</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/favorites')}>Yêu thích</DropdownMenuItem>
        <DropdownMenuItem className="hover:!text-red-500" onClick={() => signOut()}>
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
