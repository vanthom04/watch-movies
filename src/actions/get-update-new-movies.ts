'use server'

import { BASE_URL } from '@/lib/constants'

export const getUpdateNewMovies = async () => {
  const url = `${BASE_URL}/danh-sach/phim-moi-cap-nhat?page=1`

  try {
    const response = await fetch(url, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
