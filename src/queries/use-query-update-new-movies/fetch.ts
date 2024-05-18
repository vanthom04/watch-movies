import * as httpRequest from '~/utils/httpRequest'

const getUpdateNewMovies = async (page: number = 1) => {
  const response = await httpRequest.get('/danh-sach/phim-moi-cap-nhat', {
    params: { page }
  })
  return response
}

export default getUpdateNewMovies
