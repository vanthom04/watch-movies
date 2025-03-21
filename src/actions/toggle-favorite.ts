'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import { Movie } from '@/types'
import { prisma } from '@/lib/prisma'

export const toggleFavorite = async (movie: Movie) => {
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
      id: movie._id,
      userId: user.id,
      slug: movie.slug,
    }
  })

  if (favorite) {
    await prisma.favoriteMovie.delete({
      where: { id: favorite.id }
    })
  } else {
    await prisma.favoriteMovie.create({
      data: {
        id: movie._id,
        userId: user.id,
        slug: movie.slug,
        name: movie.name,
        thumbUrl: movie.thumb_url,
        posterUrl: movie.poster_url
      }
    })
  }

  revalidatePath('/favorites')
}
