import { Share2Icon } from 'lucide-react'

import { Movie } from '@/types'
import { cn } from '@/lib/utils'

interface ShareButtonProps {
  movie: Movie
  className?: string
}

export const ShareButton = ({ movie, className }: ShareButtonProps) => {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: movie.name,
        text: `Xem phim ${movie.name} tại ${window.location.href}`,
        url: window.location.href
      })
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert('Sharing is not supported in this browser. Please copy the link.')
    }
  }

  return (
    <button
      onClick={handleShare}
      className={cn(
        'flex flex-row items-center py-2.5 px-3.5 bg-emerald-600 rounded-md transition-transform duration-300 active:scale-95 cursor-pointer',
        className
      )}
    >
      <Share2Icon className="size-4 mr-2" />
      Chia sẻ
    </button>
  )
}
