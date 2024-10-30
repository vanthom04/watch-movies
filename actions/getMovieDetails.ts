import { MovieApi } from '@/types';
import { http } from '@/utils/http'

const getMovieDetails = async (slugMovie: string): Promise<MovieApi> => {
  try {
    return await http.get<MovieApi>(`/phim/${slugMovie}`)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default getMovieDetails
