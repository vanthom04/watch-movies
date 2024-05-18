import { useQuery } from '@tanstack/react-query'
import getMoviesByKeyword from './fetch'

export function useQuerySearch(keyword: string, limit?: number) {
  return useQuery({
    queryKey: ['SEARCH_MOVIES', keyword],
    queryFn: () => getMoviesByKeyword(keyword, limit),
    enabled: !!keyword
  })
}
