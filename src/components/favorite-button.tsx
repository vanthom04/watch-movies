import { toast } from 'sonner'
import { BookmarkIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'

import { Movie } from '@/types'
import { cn } from '@/lib/utils'
import { toggleFavorite } from '@/actions/toggle-favorite'
import { checkFavorite } from '@/actions/check-favorite'

interface FavoriteButtonProps {
  movie: Movie
  className?: string
}

export const FavoriteButton = ({ movie, className }: FavoriteButtonProps) => {
  const { data: session } = useSession()
  const [liked, setLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchFavorite = useCallback(checkFavorite, [movie])

  useEffect(() => {
    if (!session?.user) return

    fetchFavorite(movie)
      .then((isFavorite) => setLiked(isFavorite))
      .catch((error) => console.error(error))
  }, [fetchFavorite, movie, session?.user])

  const onToggleFavorite = async () => {
    if (!session?.user) {
      return toast.error('Bạn cần đăng nhập để tiếp tục')
    }

    setIsLoading(true)
    toggleFavorite(movie)
      .then(() => fetchFavorite(movie))
      .then((isFavorite) => {
        setLiked(isFavorite)
        if (isFavorite) {
          toast.success('Đã lưu phim')
        } else {
          toast.error('Đã xóa phim khỏi danh sách yêu thích')
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false))
  }

  return (
    <button
      onClick={onToggleFavorite}
      className={cn(
        'flex flex-row items-center py-2.5 px-3.5 bg-gray-500 rounded-md transition-transform duration-300 active:scale-95 cursor-pointer disabled:opacity-50',
        className
      )}
      disabled={isLoading}
    >
      <BookmarkIcon className={cn('size-4 mr-2', liked && 'text-white fill-current')} />
      Lưu
    </button>
  )
}
