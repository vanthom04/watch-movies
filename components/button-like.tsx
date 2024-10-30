'use client'

import Image from 'next/image'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import bookmarkIcon from '@/public/svg/bookmark.svg'

interface ButtonLikeProps {
  movie?: any
  className?: string
}

const ButtonLike: React.FC<ButtonLikeProps> = ({ className, movie }) => {
  const [liked, setLiked] = useState<boolean>(false)

  const toggleLike = async () => {
    // TODO: handle toggle like btn
  }

  return (
    <button
      onClick={toggleLike}
      className={cn('flex flex-row items-center py-2.5 px-3.5 bg-gray-500 rounded-md transition-transform duration-300 active:scale-95', liked && '', className)}
    >
      <Image
        width={20}
        height={20}
        src={bookmarkIcon}
        alt="Bookmark icon"
      />
      <span className="ml-2">Lưu</span>
    </button>
  )
}

export default ButtonLike
