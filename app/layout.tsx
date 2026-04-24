import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-playfair',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Digital Heroes — Golf Charity Prize Draws',
    template: '%s | Digital Heroes',
  },
  description:
    'Play golf. Support charities. Win prizes. Digital Heroes is the UK\'s premier subscription golf charity draw platform.',
  keywords: ['golf', 'charity', 'prize draw', 'subscription', 'stableford'],
  authors: [{ name: 'Digital Heroes Club' }],
  creator: 'Digital Heroes',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Digital Heroes',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-mist text-ink font-body antialiased">
        {children}
      </body>
    </html>
  )
}
