import { useQuery } from '@tanstack/react-query'
import getUpdateNewMovies from '~/queries/use-query-update-new-movies/fetch'
import getListMovie from './fetch'

export function useQueryListMovie(slug: string, page?: number, limit?: number) {
  return useQuery({
    queryKey: ['LIST_MOVIE', slug, page],
    queryFn: () =>
      slug === 'phim-moi-cap-nhat' ? getUpdateNewMovies() : getListMovie(slug, page, limit),
    enabled: !!slug
  })
}
