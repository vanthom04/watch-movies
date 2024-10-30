import * as z from 'zod'
import { signIn } from 'next-auth/react'

import { LoginSchema } from '@/schemas'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validatedFields.data
  
  try {
    await signIn('credentials', { email, password, redirect: false })
  } catch (error) {
    throw error
  }

  return { success: 'Logged in!' }
}
