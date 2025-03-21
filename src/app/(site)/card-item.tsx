'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Movie } from '@/types'
import { BASE_IMAGE_URL } from '@/lib/constants'
import { Skeleton } from '@/components/ui/skeleton'
import { MovieItem } from '@/components/movie-item'
import { getListMovies } from '@/actions/get-list-movies'
import { getUpdateNewMovies } from '@/actions/get-update-new-movies'
import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious
} from '@/components/ui/carousel'

interface CardItemProps {
  title: string
  slug: string
}

export const CardItem = ({ title, slug }: CardItemProps) => {
  const [data, setData] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (slug === 'phim-moi-cap-nhat') {
      getUpdateNewMovies()
        .then((data) => setData(data))
        .finally(() => setIsLoading(false))
    } else {
      getListMovies(slug)
        .then(({ data }) => setData(data))
        .finally(() => setIsLoading(false))
    }
  }, [slug])

  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="w-[200px] h-6" />
          <Skeleton className="w-[120px] h-6" />
        </div>
        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-y-1">
              <Skeleton className="w-full aspect-[3/5]" />
              <Skeleton className="w-full h-6" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-2 group/carousel">
      <div className="flex items-center justify-between">
        <h3 className="text-white text-xl font-medium md:font-semibold">{title}</h3>
        <Link
          href={`/${slug}`}
          className="text-white text-sm hover:text-[#05dbf3] transition-colors duration-200"
        >
          Xem tất cả
        </Link>
      </div>
      <Carousel opts={{ align: 'start', dragFree: true }} className="w-full h-full">
        <CarouselContent>
          {slug === 'phim-moi-cap-nhat'
            ? data?.items.map((movie: Movie) => (
              <CarouselItem key={movie._id} className="basis-[none]">
                <MovieItem
                  name={movie.name}
                  slug={movie.slug}
                  thumbUrl={movie.thumb_url}
                  posterUrl={movie.poster_url}
                  className="w-40 xs:w-44 sm:w-48 md:w-52"
                />
              </CarouselItem>
            ))
            : data?.items.map((movie: Movie) => (
              <CarouselItem key={movie._id} className="basis-[none]">
                <MovieItem
                  name={movie.name}
                  slug={movie.slug}
                  thumbUrl={BASE_IMAGE_URL + movie.thumb_url}
                  posterUrl={BASE_IMAGE_URL + movie.poster_url}
                  className="w-40 xs:w-44 sm:w-48 md:w-52"
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="w-12 h-[92%] hidden sm:block opacity-0 hover:opacity-100 group-hover/carousel:opacity-100" />
        <CarouselNext className="w-12 h-[92%] hidden sm:block opacity-0 hover:opacity-100 group-hover/carousel:opacity-100" />
      </Carousel>
    </div>
  )
}
