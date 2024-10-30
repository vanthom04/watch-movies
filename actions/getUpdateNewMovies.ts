import { http } from '@/utils/http'

const getUpdateNewMovies = async (page: number = 1): Promise<any> => {
  try {
    return await http.get<any>('/danh-sach/phim-moi-cap-nhat', {
      params: { page }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export default getUpdateNewMovies
