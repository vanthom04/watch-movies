import { useMemo } from 'react'
import { usePathname } from 'next/navigation'

const useRoutes = () => {
  const pathname = usePathname()

  const routes = useMemo(
    () => [
      {
        label: 'Trang chủ',
        href: '/',
        active: pathname === '/'
      },
      {
        label: 'Phim mới cập nhật',
        slug: 'phim-moi-cap-nhat',
        href: '/phim-moi-cap-nhat',
        active: pathname === '/list/phim-moi-cap-nhat'
      },
      {
        label: 'Phim lẻ',
        slug: 'phim-le',
        href: '/phim-le',
        active: pathname === '/list/phim-le'
      },
      {
        label: 'Phim bộ',
        slug: 'phim-bo',
        href: '/phim-bo',
        active: pathname === '/list/phim-bo'
      },
      {
        label: 'Hoạt hình',
        slug: 'hoat-hinh',
        href: '/hoat-hinh',
        active: pathname === '/list/hoat-hinh'
      },
      {
        label: 'TV Shows',
        slug: 'tv-shows',
        href: '/tv-shows',
        active: pathname === '/list/tv-shows'
      },
      {
        label: 'Yêu thích',
        href: '/my-favorites',
        active: pathname === '/my-favorites'
      }
    ],
    [pathname]
  )

  return routes
}

export default useRoutes
