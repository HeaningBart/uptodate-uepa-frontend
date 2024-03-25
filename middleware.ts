import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  if (request.url.includes('contents') || request.url.endsWith('/')) {
    const auth_token = request.cookies.get('_r')
    if (!auth_token) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    const user = await (
      await fetch(`${process.env.LOCAL_API_URL}/auth/user`, {
        headers: {
          Authorization: `Bearer ${auth_token.value}`,
        },
      })
    ).json()
    if (user.user.authorizedUntil < new Date().toISOString()) {
      return NextResponse.redirect(new URL('/store', request.nextUrl))
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
