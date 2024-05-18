import * as httpRequest from '~/utils/httpRequest'
import { MovieApi } from '~/types'

const getMovie = async (slugMovie: string): Promise<MovieApi> => {
  const response = await httpRequest.get(`phim/${slugMovie}`)
  return response
}

export default getMovie
