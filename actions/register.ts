'use server'

import * as z from 'zod'
import bcrypt from 'bcrypt'

import prisma from '@/lib/prisma'
import { UserSchema } from '@/schemas'

export const register = async (values: z.infer<typeof UserSchema>) => {
  const validatedFields = UserSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { name, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const exitingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (exitingUser) {
    return { error: 'Email already in use!' }
  }

  await prisma.user.create({
    data: { name, email, hashedPassword }
  })

  return { success: 'User created!' }
}
