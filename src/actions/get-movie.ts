'use server'

import { BASE_URL } from '@/lib/constants'

export const getMovie = async (slugMovie: string) => {
  const url = `${BASE_URL}/phim/${slugMovie}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}
