'use client'

import Image from 'next/image'
import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BookmarkIcon, PlayIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { removeFavorite } from '@/actions/remove-favorite'

interface MovieItemProps {
  id?: string
  name: string
  thumbUrl: string
  posterUrl: string
  slug: string
  className?: string
  isFavorite?: boolean
  onRefreshFavorites?: () => void
}

export const MovieItem = ({
  id,
  name,
  thumbUrl,
  posterUrl,
  slug,
  className,
  isFavorite,
  onRefreshFavorites
}: MovieItemProps) => {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState(posterUrl)
  const [liked, setLiked] = useState(isFavorite)

  const onToggleFavorite = () => {
    if (!id) return

    removeFavorite(id)
      .then(() => {
        setLiked(false)
        onRefreshFavorites?.()
        toast.success('Đã xóa khỏi danh sách yêu thích')
      })
      .catch(() => {
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau')
      })
  }

  return (
    <div className={cn('relative group', className)}>
      <div
        onClick={() => router.push(`/movie/${slug}`)}
        className="aspect-[3/5] relative flex rounded-lg overflow-hidden cursor-pointer"
      >
        <Image
          fill
          priority
          src={imageUrl}
          alt={name}
          className="object-cover"
          onError={() => setImageUrl(thumbUrl)}
        />
        <div className="absolute inset-0 bg-gray-900/40 hidden group-hover:block">
          <PlayIcon className="w-8 h-8 fill-current text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      <h3 className="text-white text-sm md:text-base mt-2 line-clamp-1">{name}</h3>
      {isFavorite && (
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 hover:bg-black/30 cursor-pointer z-50"
          onClick={onToggleFavorite}
        >
          <BookmarkIcon
            className={cn(
              'w-6 h-6',
              liked ? 'fill-current text-red-500' : 'text-white'
            )}
          />
        </Button>
      )}
    </div>
  )
}
