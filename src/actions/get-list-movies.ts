'use server'

import { BASE_URL } from '@/lib/constants'

export const getListMovies = async (slug: string, limit: number = 10) => {
  const url = `${BASE_URL}/v1/api/danh-sach/${slug}?page=1&limit=${limit}`

  try {
    const response = await fetch(url, {
      method: 'GET'
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
