import { useQuery } from '@tanstack/react-query'
import getMovie from './fetch'

export function useQueryMovie(slugMovie: string) {
  return useQuery({
    queryKey: ['MOVIE', slugMovie],
    queryFn: () => getMovie(slugMovie),
    enabled: !!slugMovie
  })
}
