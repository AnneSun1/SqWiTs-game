import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SqWiTs Game',
  description: 'A study game inspired by Squid Game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-black antialiased">
        {children}
      </body>
    </html>
  )
}

