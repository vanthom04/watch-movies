import { useMemo } from 'react'
import { usePathname } from 'next/navigation'

export const useRoutes = () => {
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
        active: pathname === '/phim-moi-cap-nhat'
      },
      {
        label: 'Phim lẻ',
        slug: 'phim-le',
        href: '/phim-le',
        active: pathname === '/phim-le'
      },
      {
        label: 'Phim bộ',
        slug: 'phim-bo',
        href: '/phim-bo',
        active: pathname === '/phim-bo'
      },
      {
        label: 'Hoạt hình',
        slug: 'hoat-hinh',
        href: '/hoat-hinh',
        active: pathname === '/hoat-hinh'
      },
      {
        label: 'TV Shows',
        slug: 'tv-shows',
        href: '/tv-shows',
        active: pathname === '/tv-shows'
      },
      {
        label: 'Yêu thích',
        href: '/favorites',
        active: pathname === '/favorites'
      }
    ],
    [pathname]
  )

  return routes
}
