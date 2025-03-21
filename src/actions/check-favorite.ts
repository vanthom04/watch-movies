'use server'

import { auth } from '@/auth'
import { Movie } from '@/types'
import { prisma } from '@/lib/prisma'

export const checkFavorite = async (movie: Movie) => {
  const session = await auth()

  if (!session?.user || !session?.user.email) {
    throw new Error('Unauthorized')
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  if (!user) {
    throw new Error('User not found')
  }

  const favorite = await prisma.favoriteMovie.findUnique({
    where: {
      userId: user.id,
      slug: movie.slug,
      id: movie._id
    }
  })

  return !!favorite
}

