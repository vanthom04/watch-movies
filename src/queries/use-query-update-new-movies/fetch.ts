import { api } from '~/utils/api'

const getUpdateNewMovies = async (page: number = 1): Promise<any> => {
  try {
    return await api.get<any>('/danh-sach/phim-moi-cap-nhat', {
      params: { page }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export default getUpdateNewMovies
