import { api } from '~/utils/api'
import { MovieApi } from '~/types'

const getMovie = async (slugMovie: string): Promise<MovieApi> => {
  try {
    return await api.get<MovieApi>(`/phim/${slugMovie}`)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default getMovie
