'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import { Movie } from '@/types'
import { BASE_IMAGE_URL } from '@/lib/constants'
import { MovieItem } from '@/components/movie-item'
import { getListMovies } from '@/actions/get-list-movies'
import { getUpdateNewMovies } from '@/actions/get-update-new-movies'
import { Skeleton } from '@/components/ui/skeleton'

const SlugCategory = () => {
  const { slugCategory } = useParams<{ slugCategory: string }>()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<any>()

  useEffect(() => {
    if (slugCategory === 'phim-moi-cap-nhat') {
      getUpdateNewMovies()
        .then((data) => setData(data))
        .finally(() => setIsLoading(false))
    } else {
      getListMovies(slugCategory, 20)
        .then(({ data }) => setData(data))
        .finally(() => setIsLoading(false))
    }
  }, [slugCategory])

  return (
    <div className="flex flex-col gap-y-4 animate-fade-in px-4 py-2">
      {!isLoading ? (
        <h1 className="text-white text-2xl font-semibold">
          {slugCategory === 'phim-moi-cap-nhat'
            ? 'Phim Mới Cập Nhật'
            : data?.data?.titlePage}
        </h1>
      ) : (
        <Skeleton className="w-[200px] h-8" />
      )}
      {isLoading ? (
        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-y-1">
              <Skeleton className="w-full aspect-[3/5]" />
              <Skeleton className="w-full h-6" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
            {slugCategory == 'phim-moi-cap-nhat'
              ? data?.items.map((movie: Movie) => (
                <MovieItem
                  key={movie._id}
                  slug={movie.slug}
                  name={movie.name}
                  thumbUrl={movie.thumb_url}
                  posterUrl={movie.poster_url}
                />
              ))
              : data?.items.map((movie: Movie) => (
                <MovieItem
                  key={movie._id}
                  slug={movie.slug}
                  name={movie.name}
                  thumbUrl={BASE_IMAGE_URL + movie.thumb_url}
                  posterUrl={BASE_IMAGE_URL + movie.poster_url}
                />
              ))}
          </div>
        </>
      )}
    </div>
  )
}

export default SlugCategory
