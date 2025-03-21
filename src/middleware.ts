import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export default auth((req) => {
  if (req.nextUrl.pathname.startsWith('/favorites')) {
    if (!req.auth) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
