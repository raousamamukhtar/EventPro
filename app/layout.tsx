import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

import { EVENT_CONFIG } from '@/lib/config'

export const metadata: Metadata = {
  title: `${EVENT_CONFIG.name} - ${EVENT_CONFIG.organizer}`,
  description: EVENT_CONFIG.description,
  generator: 'v0.dev',
  icons: {
    icon: '/placeholder-logo.svg',
    shortcut: '/placeholder-logo.svg',
    apple: '/placeholder-logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
