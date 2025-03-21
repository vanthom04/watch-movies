'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export const getFavorites = async () => {
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

  const favorites = await prisma.favoriteMovie.findMany({
    where: {
      userId: user.id
    }
  })

  return favorites
}
