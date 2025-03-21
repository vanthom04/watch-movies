'use server'

import { BASE_URL } from '@/lib/constants'

export const getMoviesByKeyword = async (keyword: string, limit: number = 10) => {
  const url = `${BASE_URL}/v1/api/tim-kiem?keyword=${keyword}&limit=${limit}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch movies')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
