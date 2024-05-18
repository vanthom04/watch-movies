import { Link } from 'react-router-dom'
import { SearchIcon } from 'lucide-react'

import config from '~/config'
import Account from './common/account'
import NavItem from './common/nav-item'

interface MenuType {
  id: string
  to: string
  title: string
  slug?: string | null
}

const MENU_OPTIONS: MenuType[] = [
  {
    id: 'home',
    to: config.routes.home,
    title: 'Trang chủ'
  },
  {
    id: 'newly-updated-movies',
    to: '/danh-sach',
    title: 'Phim mới cập nhật',
    slug: 'phim-moi-cap-nhat'
  },
  {
    id: 'single-movie',
    to: '/danh-sach',
    title: 'Phim lẻ',
    slug: 'phim-le'
  },
  {
    id: 'series-movie',
    to: '/danh-sach',
    title: 'Phim bộ',
    slug: 'phim-bo'
  },
  {
    id: 'anime',
    to: '/danh-sach',
    title: 'Hoạt hình',
    slug: 'hoat-hinh'
  },
  {
    id: 'tv-shows',
    to: '/danh-sach',
    title: 'TV Shows',
    slug: 'tv-shows'
  },
  {
    id: 'my-favorite',
    to: '/danh-sach-cua-toi',
    title: 'Danh sách của tôi'
  }
]

const Header = () => {
  return (
    <div className="w-full h-[64px] flex flex-row items-center">
      <Link to={config.routes.home} className="mr-8">
        <img className="w-10 h-10 lg:w-12 lg:h-12" src="/logo.jpg" alt="Logo" />
      </Link>
      <nav className="hidden sm:block">
        <ul className="flex flex-row gap-x-4">
          {MENU_OPTIONS.map(({ id, title, to, slug }) => (
            <li key={id}>
              <NavItem to={to} title={title} slug={slug} />
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-row items-center justify-center gap-x-6 ml-auto">
        <Link to={'/tim-kiem'}>
          <SearchIcon className="w-6 h-6 text-white sm:hover:text-[#05dbf3] transition-colors duration-200" />
        </Link>
        <Account />
      </div>
    </div>
  )
}

export default Header
