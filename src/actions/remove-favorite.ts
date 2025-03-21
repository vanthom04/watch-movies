'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export const removeFavorite = async (movieId: string) => {
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
      id: movieId,
      userId: user.id,
    }
  })

  if (!favorite) {
    throw new Error('Favorite not found')
  }

  await prisma.favoriteMovie.delete({ where: { id: favorite.id } })
  revalidatePath('/favorites')
}
