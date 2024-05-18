import { NavLink } from 'react-router-dom'
import { cn } from '~/lib/utils'

interface NavItemProps {
  to: string
  title: string
  slug?: string | null
}

const NavItem: React.FC<NavItemProps> = ({ to, title, slug }) => {
  return (
    <NavLink
      to={slug ? `${to}/${slug}` : to}
      className={({ isActive }) =>
        cn(
          'text-[#d5d6d7] font-normal text-sm lg:text-base hover:text-[#b3b3b3] transition-colors duration-200',
          { 'font-medium text-white hover:text-white': isActive }
        )
      }
    >
      {title}
    </NavLink>
  )
}

export default NavItem
