import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // For token-based auth, logout is handled client-side by removing the token
    // The server doesn't need to do anything special
    return NextResponse.json({ message: 'Logout successful' })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Logout error:', error)
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 