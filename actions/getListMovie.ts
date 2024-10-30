import { http } from '@/utils/http'

const getListMovie = async (slug: string, page: number = 1, limit: number = 20): Promise<any> => {
  try {
    return await http.get<any>(`/v1/api/danh-sach/${slug}`, {
      params: { page, limit }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export default getListMovie
