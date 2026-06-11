import React from 'react'
import Link from 'next/link'
import { Image as LucideImage, MapPin, ArrowLeft, LayoutGrid } from 'lucide-react'
import { getGalleryImages, getUniqueDestinations, getGalleryImagesByDestination } from '@/lib/sanity'

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string }>
}) {
  const { destination } = await searchParams
  
  let images = await getGalleryImages()
  const allDestinations = await getUniqueDestinations()
  const uniqueDestinations = Array.from(new Set(allDestinations))

  if (destination) {
    images = await getGalleryImagesByDestination(destination)
  }

  return (
    <div className="min-h-screen bg-secondary pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <LucideImage className="text-primary" size={32} />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">Visual Journeys</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Capturing the beauty of the world, one destination at a time.
          </p>
        </div>

        {/* Destination Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Link
            href="/gallery"
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              !destination ? 'bg-primary text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-primary'
            }`}
          >
            All Destinations
          </Link>
          {uniqueDestinations.map((dest: string) => (
            <Link
              key={dest}
              href={`/gallery?destination=${encodeURIComponent(dest)}`}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                destination === dest ? 'bg-primary text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-primary'
              }`}
            >
              {dest}
            </Link>
          ))}
        </div>

        {images && images.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {images.map((img: any) => (
              <div key={img._id} className="relative group break-inside-avoid rounded-2xl overflow-hidden bg-white">
                <img
                  src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${img.image.asset._ref}-jpg`}
                  alt={img.title}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                  <div className="flex items-center gap-2 text-white/90 text-xs font-medium mb-2">
                    <MapPin size={12} />
                    {img.destination}
                  </div>
                  <h3 className="text-white font-bold text-lg">{img.title}</h3>
                  {img.caption && <p className="text-white/70 text-sm line-clamp-2">{img.caption}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="flex justify-center mb-4">
              <LayoutGrid size={48} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-medium text-gray-400">No images found for this destination.</h1>
          </div>
        )}
      </div>
    </div>
  )
}
