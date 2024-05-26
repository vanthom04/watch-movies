import { api } from '~/utils/api'
import { ListMovieApi } from '~/types'

const getListMovie = async (
  slug: string,
  page: number = 1,
  limit: number = 20
): Promise<ListMovieApi> => {
  try {
    return await api.get<ListMovieApi>(`/v1/api/danh-sach/${slug}`, {
      params: { page, limit }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export default getListMovie
