import { useState } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '~/lib/utils'
import { ItemListMovie } from '~/types'
import { BASE_IMAGE_URL } from '~/utils'
import { useQueryListMovie } from '~/queries'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '~/components/ui/carousel'
import MovieItem from '~/components/movie-item'

interface CardItemProps {
  data: {
    id: number
    title: string
    slug: string
  }
}

const CardItem: React.FC<CardItemProps> = ({ data }) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const { data: resultData } = useQueryListMovie(data.slug, 1, 10)

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-white text-xl md:text-2xl font-medium md:font-semibold">
          {data.title}
        </h3>
        <Link
          to={`/danh-sach/${data.slug}`}
          className="text-white text-sm hover:text-[#05dbf3] transition-colors duration-200"
        >
          Xem tất cả
        </Link>
      </div>
      <Carousel opts={{ align: 'start', dragFree: true }} className="w-full h-full">
        <CarouselContent>
          {data.slug === 'phim-moi-cap-nhat'
            ? resultData?.items.map((movie: ItemListMovie) => (
                <CarouselItem
                  key={movie._id}
                  onMouseEnter={() => setIsShow(true)}
                  onMouseLeave={() => setIsShow(false)}
                >
                  <MovieItem name={movie.name} imageUrl={movie.poster_url} slug={movie.slug} />
                </CarouselItem>
              ))
            : resultData?.data.items.map((movie: ItemListMovie) => (
                <CarouselItem
                  key={movie._id}
                  onMouseEnter={() => setIsShow(true)}
                  onMouseLeave={() => setIsShow(false)}
                >
                  <MovieItem
                    name={movie.name}
                    imageUrl={BASE_IMAGE_URL + movie.poster_url}
                    slug={movie.slug}
                  />
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious
          className={cn(
            'w-12 h-[245px] lg:h-[312px] hidden sm:block rounded-none opacity-0 hover:opacity-100 transition-opacity duration-300',
            { 'opacity-100': isShow }
          )}
        />
        <CarouselNext
          className={cn(
            'w-12 h-[245px] lg:h-[312px] hidden sm:block rounded-none opacity-0 hover:opacity-100 transition-opacity duration-300',
            { 'opacity-100': isShow }
          )}
        />
      </Carousel>
    </div>
  )
}

export default CardItem
