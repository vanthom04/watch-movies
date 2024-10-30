'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import getListMovie from '@/actions/getListMovie'
import getUpdateNewMovies from '@/actions/getUpdateNewMovies'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import MovieItem from '@/components/movie-item'
import { Skeleton } from '@/components/ui/skeleton'

interface CardItemProps {
  data: {
    id: number
    title: string
    slug: string
  }
}

const CardItem: React.FC<CardItemProps> = ({ data }) => {
  const [movies, setMovies] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isShow, setIsShow] = useState<boolean>(false)

  useEffect(() => {
    if (data.slug === 'phim-moi-cap-nhat') {
      getUpdateNewMovies()
        .then((data) => setMovies(data))
        .finally(() => setIsLoading(false))
    } else {
      getListMovie(data.slug)
        .then((data) => setMovies(data))
        .finally(() => setIsLoading(false))
    }
  }, [data.slug])

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-row items-center justify-between">
        {isLoading ? (
          <Skeleton className="w-[200px]" />
        ) : (
          <>
            <h3 className="text-white text-xl font-medium md:font-semibold">
              {data.title}
            </h3>
            <Link
              href={`/list/${data.slug}`}
              className="text-white text-sm hover:text-[#05dbf3] transition-colors duration-200"
            >
              Xem tất cả
            </Link>
          </>
        )}
      </div>
      <Carousel opts={{ align: 'start', dragFree: true }} className="w-full h-full">
        <CarouselContent>
          {data.slug === 'phim-moi-cap-nhat'
            ? movies?.items.map((movie: any) => (
                <CarouselItem
                  key={movie._id}
                  onMouseEnter={() => setIsShow(true)}
                  onMouseLeave={() => setIsShow(false)}
                >
                  <MovieItem
                    name={movie.name}
                    slug={movie.slug}
                    thumbUrl={movie.thumb_url}
                    posterUrl={movie.poster_url}
                  />
                </CarouselItem>
              ))
            : movies?.data.items.map((movie: any) => (
                <CarouselItem
                  key={movie._id}
                  onMouseEnter={() => setIsShow(true)}
                  onMouseLeave={() => setIsShow(false)}
                >
                  <MovieItem
                    name={movie.name}
                    slug={movie.slug}
                    thumbUrl={movie.thumb_url}
                    posterUrl={movie.poster_url}
                  />
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious
          className={cn(
            'w-12 h-[245px] xs:h-72 md:h-80 lg:h-[312px] hidden sm:block rounded-none opacity-0 hover:opacity-100 transition-opacity duration-300',
            { 'opacity-100': isShow }
          )}
        />
        <CarouselNext
          className={cn(
            'w-12 h-[245px] xs:h-72 md:h-80 lg:h-[312px] hidden sm:block rounded-none opacity-0 hover:opacity-100 transition-opacity duration-300',
            { 'opacity-100': isShow }
          )}
        />
      </Carousel>
    </div>
  )
}

export default CardItem
