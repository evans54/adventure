import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Lessy Adventures | Explore the World',
    template: '%s | Lessy Adventures',
  },
  description: 'Curated travel packages, destination guides, and inspiring stories for the modern explorer.',
  keywords: ['travel', 'adventure', 'vacation packages', 'travel blog', 'destinations'],
  robots: 'index, follow',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
