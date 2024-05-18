import { useQuery } from '@tanstack/react-query'
import getUpdateNewMovies from './fetch'

export function useQueryUpdateNewMovies(page?: number) {
  return useQuery({
    queryKey: ['UPDATE_NEW_MOVIES', page],
    queryFn: () => getUpdateNewMovies(page)
  })
}
