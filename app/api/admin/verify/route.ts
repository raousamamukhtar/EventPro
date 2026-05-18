import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('admin_token')

    if (!token) {
      return NextResponse.json(
        { message: 'No authentication token' },
        { status: 401 }
      )
    }

    const JWT_SECRET = process.env.JWT_SECRET
    if (!JWT_SECRET) {
      if (process.env.NODE_ENV === 'development') {
        console.error('JWT_SECRET not configured')
      }
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      )
    }

    try {
      // Verify JWT token
      const decoded = verify(token.value, JWT_SECRET, { algorithms: ['HS256'] }) as any
      
      // Check if token is expired
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        cookieStore.delete('admin_token')
        return NextResponse.json(
          { message: 'Token expired' },
          { status: 401 }
        )
      }

      // Check if user has admin role
      if (decoded.role !== 'admin') {
        return NextResponse.json(
          { message: 'Insufficient permissions' },
          { status: 403 }
        )
      }

      return NextResponse.json({ 
        message: 'Authenticated',
        user: { email: decoded.email, role: decoded.role }
      })

    } catch (jwtError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('JWT verification failed:', jwtError)
      }
      cookieStore.delete('admin_token')
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Auth verification error:', error)
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 