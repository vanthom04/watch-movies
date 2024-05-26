import { useParams } from 'react-router-dom'

import { ItemListMovie } from '~/types'
import { BASE_IMAGE_URL } from '~/utils'
import { useQueryListMovie } from '~/queries'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '~/components/ui/pagination'
import Spinner from '~/components/spinner'
import MovieItem from '~/components/movie-item'

const ListMoviePage = () => {
  const params = useParams<{ slugCategory: string }>()
  const { data: listMovie, isLoading } = useQueryListMovie(params?.slugCategory ?? '')

  return (
    <div className="flex flex-col gap-y-4 md:gap-y-6 animate-fade-in">
      {!isLoading && (
        <h1 className="text-white text-2xl font-semibold">
          {params?.slugCategory === 'phim-moi-cap-nhat'
            ? 'Phim mới cập nhật'
            : listMovie?.data?.titlePage}
        </h1>
      )}
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <Spinner className="" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2.5 lg:gap-6">
            {params.slugCategory !== 'phim-moi-cap-nhat'
              ? listMovie?.data.items?.map((movie: ItemListMovie) => (
                  <MovieItem
                    key={movie._id}
                    name={movie.name}
                    imageUrl={BASE_IMAGE_URL + movie.poster_url}
                    slug={movie.slug}
                  />
                ))
              : listMovie?.items?.map((movie: ItemListMovie) => (
                  <MovieItem
                    key={movie._id}
                    name={movie.name}
                    imageUrl={movie.poster_url}
                    slug={movie.slug}
                  />
                ))}
          </div>
          <Pagination className="bg-transparent select-none">
            <PaginationContent>
              <PaginationItem className="text-white border border-white rounded-lg">
                <PaginationPrevious />
              </PaginationItem>
              {Array.from({ length: 3 }).map((_, index) => (
                <PaginationItem key={index} className="text-white border border-white rounded-lg">
                  <PaginationLink>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem className="text-white border border-white rounded-lg">
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  )
}

export default ListMoviePage
