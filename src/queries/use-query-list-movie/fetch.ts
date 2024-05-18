import * as httpRequest from '~/utils/httpRequest'
import { ListMovieApi } from '~/types'

const getListMovie = async (
  slug: string,
  page: number = 1,
  limit: number = 20
): Promise<ListMovieApi> => {
  const response = await httpRequest.get(`v1/api/danh-sach/${slug}`, {
    params: { page, limit }
  })
  return response
}

export default getListMovie
