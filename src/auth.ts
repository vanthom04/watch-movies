import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { prisma } from '@/lib/prisma'

async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  // Trong môi trường development, sử dụng so sánh trực tiếp để thuận tiện
  // Trong môi trường production, bạn nên sử dụng một thư viện bcrypt hoặc argon2
  // chính thức để so sánh mật khẩu
  return plainPassword === hashedPassword
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider,
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string }
        if (!email || !password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user || !user.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        // Sử dụng hàm verifyPassword ở trên
        const isPasswordValid = await verifyPassword(password, user.hashedPassword)

        if (!isPasswordValid) {
          throw new Error('Invalid credentials')
        }

        return user
      }
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        if (profile?.email?.endsWith('@gmail.com')) {
          return true
        }
        return false
      }

      return true
    }
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
})
