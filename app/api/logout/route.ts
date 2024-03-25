import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
export async function GET(request: NextRequest, response: NextResponse) {
  const cookieStore = cookies()
  const auth_token = cookieStore.get('_r')
  if (auth_token) {
    cookieStore.set({
      name: '_r',
      value: '',
      maxAge: 0,
    })

    return NextResponse.redirect(
      new URL('/login', process.env.NEXT_PUBLIC_WEBSITE_URL).toString()
    )
  } else {
    return NextResponse.redirect(
      new URL('/login', process.env.NEXT_PUBLIC_WEBSITE_URL).toString()
    )
  }
}
