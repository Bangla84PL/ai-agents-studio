/**
 * Supabase Client (Middleware)
 *
 * This client is used in Next.js middleware for auth session refresh.
 */

import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect authenticated routes
  if (
    !user &&
    (request.nextUrl.pathname.startsWith('/dashboard') ||
      request.nextUrl.pathname.startsWith('/agents') ||
      request.nextUrl.pathname.startsWith('/templates') ||
      request.nextUrl.pathname.startsWith('/executions') ||
      request.nextUrl.pathname.startsWith('/settings'))
  ) {
    // Redirect to login
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth pages
  if (
    user &&
    (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return response
}
