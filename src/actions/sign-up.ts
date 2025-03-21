'use server'

import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { signUpSchema } from '@/schemas/auth'

export const signUpAction = async (values: z.infer<typeof signUpSchema>) => {
  const { success, data } = signUpSchema.safeParse(values)

  if (!success) {
    return { status: 400, message: 'Invalid fields' }
  }

  const { name, email, password } = data

  try {
    const exitingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (exitingUser) {
      return { status: 409, message: 'Email already in use!' }
    }

    const user = await prisma.user.create({
      data: { name, email, hashedPassword: password }
    })

    return { status: 201, message: 'User created!', user }
  } catch (error) {
    console.error(error)
    return { status: 500, message: 'Failed to create user' }
  }
}
