import { http } from '@/utils/http'
import { SearchApi } from '@/types'

const getMoviesByKeyword = async (keyword: string, limit: number = 10): Promise<SearchApi> => {
  try {
    return await http.get<SearchApi>('/v1/api/tim-kiem', {
      params: { keyword, limit }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export default getMoviesByKeyword
