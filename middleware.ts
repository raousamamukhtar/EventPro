import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect API routes, not page routes
  if (pathname.startsWith('/api/admin') || pathname.startsWith('/api/registrations') || pathname.startsWith('/api/export')) {
    // Skip auth check for login endpoint and test endpoints
    if (pathname === '/api/admin/login' || pathname.startsWith('/api/test-')) {
      return NextResponse.next()
    }

    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }

    // For now, just check if token exists - JWT verification will be done in API routes
    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/admin/:path*',
    '/api/registrations/:path*',
    '/api/export/:path*'
  ]
} 