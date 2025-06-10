import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Providers } from '@/components/Providers'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
}

export const metadata: Metadata = {
  title: 'Lofi Vibes',
  description: 'Minimalist lofi music player with beautiful wallpapers',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Lofi Vibes',
    startupImage: [
      '/apple-splash-2048-2732.png',
      '/apple-splash-1668-2388.png',
      '/apple-splash-1536-2048.png',
      '/apple-splash-1125-2436.png',
      '/apple-splash-750-1334.png',
    ],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="h-full bg-black text-white antialiased font-['Inter']">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
