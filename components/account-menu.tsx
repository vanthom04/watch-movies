import { signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface AccountMenuProps {
  name: string
  email: string
  image: string
}

const AccountMenu: React.FC<AccountMenuProps> = ({ name, email, image }) => {
  return (
    <div className="flex items-center justify-center select-none">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar>
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="pt-1.5 pb-0.5">{name}</DropdownMenuLabel>
          <p className="text-xs font-semibold px-2">{email}</p>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Tài khoản</DropdownMenuItem>
          <DropdownMenuItem>Yêu thích</DropdownMenuItem>
          <DropdownMenuItem
            className="hover:!text-red-500"
            onClick={() => signOut()}
          >
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default AccountMenu
