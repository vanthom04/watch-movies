'use client'

import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { PlayIcon, TriangleAlertIcon } from 'lucide-react'

import { Movie } from '@/types'
import { getMovie } from '@/actions/get-movie'
import { ShareButton } from '@/components/share-button'
import { FavoriteButton } from '@/components/favorite-button'

import { MovieSkeleton } from './movie-skeleton'

const SlugMovie = () => {
  const { slugMovie } = useParams<{ slugMovie: string }>()

  const [isLoading, setIsLoading] = useState(true)
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    getMovie(slugMovie)
      .then(({ movie }) => setMovie(movie))
      .finally(() => {
        setIsLoading(false)
        window.scrollTo(0, 0)
      })
  }, [slugMovie])

  if (isLoading) {
    return <MovieSkeleton />
  }

  if (!movie) {
    return (
      <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center gap-y-2">
        <TriangleAlertIcon className="size-10 text-red-500" />
        <h1 className="text-lg text-center text-neutral-100">Phim không tồn tại</h1>
      </div>
    )
  }

  return (
    <div className="px-4 py-2 animate-fade-in">
      <div className="w-full flex flex-row gap-x-4">
        <div className="basis-2/3">
          <div className="relative aspect-video">
            <Image
              fill
              priority
              className="rounded-md object-cover"
              src={movie.thumb_url}
              alt={movie.name}
            />
          </div>
        </div>
        <div className="basis-1/3 text-white space-y-1">
          <h1 className="text-2xl text-wrap font-semibold">{movie.name}</h1>
          <div className="flex flex-row">
            <div className="mr-2">Ngày cập nhật:</div>
            <div>{format(movie.modified.time, 'dd/MM/yyyy')}</div>
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="mr-2">Đạo diễn:</div>
            {movie.director.map((director, index) => {
              if (!director) {
                return <span key={index}>Chưa biết</span>
              }

              return (
                <span key={index} className="mr-2">
                  {index === movie.director.length - 1 ? director : director + ','}
                </span>
              )
            })}
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="mr-2">Diễn viên:</div>
            {movie.actor.map((actor, index) => {
              if (!actor) {
                return <span key={index}>Chưa biết</span>
              }

              return (
                <span key={index} className="mr-2">
                  {index === movie.actor.length - 1 ? actor : actor + ','}
                </span>
              )
            })}
          </div>
          <div className="flex flex-row">
            <div className="mr-2">Thời lượng:</div>
            <div>{movie.time}</div>
          </div>
          <div className="flex flex-row">
            <div className="mr-2">Trạng thái:</div>
            <div>{movie.episode_current}</div>
          </div>
          <div className="flex flex-row">
            <div className="mr-2">Tổng số tập:</div>
            <div>{movie.episode_total}</div>
          </div>
          <div className="flex flex-row">
            <div className="mr-2">Chất lượng:</div>
            <div>{movie.quality}</div>
          </div>
          <div className="flex flex-row">
            <div className="mr-2">Ngôn ngữ:</div>
            <div>{movie.lang}</div>
          </div>
          <div className="flex flex-row">
            <div className="mr-2">Năm sản xuất:</div>
            <div>{movie.year}</div>
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="mr-2">Quốc gia:</div>
            {movie.country.map((country, index) => {
              if (!country.name) {
                return <span key={index}>Chưa biết</span>
              }

              return (
                <span key={index} className="mr-2">
                  {index === movie.country.length - 1
                    ? country.name
                    : country.name + ','}
                </span>
              )
            })}
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="mr-2">Thể loại:</div>
            {movie.category.map((category, index) => {
              if (!category.name) {
                return <span key={index}>Chưa biết</span>
              }

              return (
                <span key={index} className="mr-2">
                  {index === movie.category.length - 1
                    ? category.name
                    : category.name + ','}
                </span>
              )
            })}
          </div>
          {/* button click watch movie */}
          <div className="flex flex-row items-center gap-x-3 !mt-4">
            <Link
              href={`/watch/${movie.slug}`}
              className="flex flex-row items-center justify-center py-2.5 px-3.5 rounded-md bg-[#AD49E1] transition-transform duration-300 active:scale-95"
            >
              <PlayIcon className="size-4 fill-current text-white mr-2" />
              Xem phim
            </Link>
            <ShareButton movie={movie} />
            <FavoriteButton movie={movie} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center text-white mt-10 mx-auto max-w-[960px]">
        <h2 className="text-2xl text-center">{movie.name}</h2>
        <div
          className="font-light text-center mt-2"
          dangerouslySetInnerHTML={{ __html: movie.content || '' }}
        />
      </div>
    </div>
  )
}

export default SlugMovie
