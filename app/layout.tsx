import type { Metadata } from 'next'
import './globals.css'

// Note: Using system fonts as fallback due to build environment restrictions
// In production, Jost font will be loaded via Google Fonts CDN in globals.css

export const metadata: Metadata = {
  title: {
    default: 'AI Agents Studio - Build, Deploy & Manage AI Agents',
    template: '%s | AI Agents Studio',
  },
  description:
    'Create and deploy AI agents with ease. Visual builder, pre-built templates, and seamless integrations with n8n and Flowise. Built by SmartCamp.AI.',
  keywords: [
    'AI agents',
    'automation',
    'n8n',
    'Flowise',
    'AI workflows',
    'chatbots',
    'agent builder',
    'SmartCamp.AI',
  ],
  authors: [{ name: 'SmartCamp.AI', url: 'https://smartcamp.ai' }],
  creator: 'SmartCamp.AI',
  publisher: 'SmartCamp.AI',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '192x192', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://agents.smartcamp.ai',
    siteName: 'AI Agents Studio',
    title: 'AI Agents Studio - Build, Deploy & Manage AI Agents',
    description:
      'Create and deploy AI agents with ease. Visual builder, pre-built templates, and seamless integrations.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Agents Studio - Build, Deploy & Manage AI Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agents Studio - Build, Deploy & Manage AI Agents',
    description:
      'Create and deploy AI agents with ease. Visual builder, pre-built templates, and seamless integrations.',
    images: ['/og-image.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#1f4d2f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
