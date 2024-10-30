'use client'

import { useEffect, useState } from 'react'

import getListMovie from '@/actions/getListMovie'
import getUpdateNewMovies from '@/actions/getUpdateNewMovies'
import ButtonScrollToTop from '@/components/button-scroll-to-top'
import MovieItem from '@/components/movie-item'
import Spinner from '@/components/spinner'

interface IParams {
  slugCategory: string
}

const ListMovie = ({ params }: { params: IParams }) => {
  const [movies, setMovies] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (params.slugCategory === 'phim-moi-cap-nhat') {
      setIsLoading(true)
      getUpdateNewMovies()
        .then((data) => setMovies(data))
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(true)
      getListMovie(params.slugCategory)
        .then((data) => setMovies(data))
        .finally(() => setIsLoading(false))
    }
  }, [params])

  return (
    <div className="flex flex-col gap-y-4 md:gap-y-6 animate-fade-in">
      {!isLoading && (
        <h1 className="text-white text-2xl">
          {params?.slugCategory === 'phim-moi-cap-nhat'
            ? 'Phim mới cập nhật'
            : movies?.data?.titlePage}
        </h1>
      )}
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <Spinner className="w-12 h-12 text-white" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2.5 lg:gap-6">
            {params.slugCategory !== 'phim-moi-cap-nhat'
              ? movies?.data.items?.map((movie: any) => (
                  <MovieItem
                    key={movie._id}
                    name={movie.name}
                    thumbUrl={movie.thumb_url}
                    posterUrl={movie.poster_url}
                    slug={movie.slug}
                  />
                ))
              : movies?.items?.map((movie: any) => (
                  <MovieItem
                    key={movie._id}
                    name={movie.name}
                    thumbUrl={movie.thumb_url}
                    posterUrl={movie.poster_url}
                    slug={movie.slug}
                  />
                ))}
          </div>
        </>
      )}
      <ButtonScrollToTop />
    </div>
  )
}

export default ListMovie
