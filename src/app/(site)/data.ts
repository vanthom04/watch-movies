export interface ItemType {
  id: number
  title: string
  slug: string
}

export const items: ItemType[] = [
  {
    id: 1,
    title: 'Phim mới cập nhật',
    slug: 'phim-moi-cap-nhat'
  },
  {
    id: 2,
    title: 'Phim lẻ',
    slug: 'phim-le'
  },
  {
    id: 3,
    title: 'Phim bộ',
    slug: 'phim-bo'
  },
  {
    id: 4,
    title: 'Hoạt hình',
    slug: 'hoat-hinh'
  },
  {
    id: 5,
    title: 'TV Shows',
    slug: 'tv-shows'
  }
]
