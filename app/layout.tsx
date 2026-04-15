import type { Metadata, Viewport } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CookieBanner } from '@/components/cookie-banner'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant'
})

export const metadata: Metadata = {
  title: 'YULI COLORS | Centro de Estética Premium',
  description: 'Tratamientos estéticos avanzados con resultados naturales. Micropigmentación artística, arquitectura de cejas, rituales faciales y escultura corporal en un ambiente de exclusividad.',
  keywords: ['estética premium', 'micropigmentación', 'diseño de cejas', 'tratamientos faciales', 'belleza natural', 'rejuvenecimiento facial', 'YULI COLORS'],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/images/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    shortcut: '/icon.svg',
    apple: '/images/logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#f5f0eb',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${cormorant.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        <CookieBanner />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
