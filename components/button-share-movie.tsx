'use client'

import Image from 'next/image'

import { cn } from '@/lib/utils'
import shareIcon from '@/public/svg/share.svg'

interface ButtonShareMovieProps {
  movie: any
  className?: string
}

const ButtonShareMovie: React.FC<ButtonShareMovieProps> = ({ movie, className }) => {
  const handleShareMovie = async () => {
    try {
      await navigator.share({
        title: movie.name,
        text: `Xem phim ${movie.name} tại ${window.location.href}`,
        url: window.location.href
      })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  return (
    <button
      onClick={handleShareMovie}
      className={cn('flex flex-row items-center py-2.5 px-3.5 bg-emerald-600 rounded-md transition-transform duration-300 active:scale-95', className)}
    >
      <Image
        priority
        width={20}
        height={20}
        src={shareIcon}
        alt="Share icon"
      />
      <span className="ml-2">Chia sẻ</span>
    </button>
  )
}

export default ButtonShareMovie
