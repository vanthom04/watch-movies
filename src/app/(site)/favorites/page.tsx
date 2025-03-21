'use client'

import { useEffect, useState } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { MovieItem } from '@/components/movie-item'
import { getFavorites } from '@/actions/get-favorites'

const Favorites = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState<any[]>([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    getFavorites()
      .then((data) => setFavorites(data))
      .finally(() => setIsLoading(false))
  }, [count])

  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-4 animate-fade-in px-4 py-2">
        <Skeleton className="w-[200px] h-8" />
        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-y-1">
              <Skeleton className="w-full aspect-[3/5]" />
              <Skeleton className="w-full h-6" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (favorites.length === 0) {
    return <div className="flex flex-col gap-y-4 animate-fade-in px-4 py-2">
      <h1 className="text-white text-2xl font-semibold">
        Yêu thích
      </h1>
      <div className="text-white text-center">Không có phim yêu thích</div>
    </div>
  }

  if (!favorites) {
    return (
      <div className="flex flex-col gap-y-4 animate-fade-in px-4 py-2">
        <h1 className="text-white text-2xl font-semibold">
          Yêu thích
        </h1>
        <div className="text-white text-center">
          Không có phim yêu thích
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-4 animate-fade-in px-4 py-2">
      <h1 className="text-white text-2xl font-semibold">
        Yêu thích
      </h1>
      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
        {favorites.map((favorite) => (
          <MovieItem
            isFavorite
            id={favorite.id}
            key={favorite.id}
            name={favorite.name}
            slug={favorite.slug}
            thumbUrl={favorite.thumbUrl}
            posterUrl={favorite.posterUrl}
            onRefreshFavorites={() => setCount((prev) => prev + 1)}
          />
        ))}
      </div>
    </div>
  )
}

export default Favorites
