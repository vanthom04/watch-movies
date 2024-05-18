import * as httpRequest from '~/utils/httpRequest'
import { SearchApi } from '~/types'

const getMoviesByKeyword = async (keyword: string, limit: number = 10): Promise<SearchApi> => {
  const response = await httpRequest.get('v1/api/tim-kiem', {
    params: { keyword, limit }
  })

  return response
}

export default getMoviesByKeyword
