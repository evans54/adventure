import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Clock, CheckCircle, XCircle, ArrowLeft, Calendar } from 'lucide-react'
import { getTravelPackageBySlug } from '@/lib/sanity'

export async function generateStaticParams() {
  // In a real scenario, you would fetch all package slugs here to pre-render pages
  return []
}

export default async function PackageDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const pkg = await getTravelPackageBySlug(slug)

  if (!pkg) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${pkg.featuredImage ? pkg.featuredImage.asset._ref : 'placeholder'}-jpg`}
          alt={pkg.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12">
            <div className="text-white">
              <Link 
                href="/packages" 
                className="flex items-center gap-2 text-sm font-medium mb-6 hover:text-gray-200 transition-colors"
              >
                <ArrowLeft size={16} /> Back to Packages
              </Link>
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{pkg.title}</h1>
              <div className="flex flex-wrap gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span>{pkg.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span>{pkg.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span>{pkg.category?.title || 'General'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {pkg.description}
              </p>
            </section>

            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <section>
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">Detailed Itinerary</h2>
                <div className="space-y-8">
                  {pkg.itinerary.map((item: any, index: number) => (
                    <div key={index} className="flex gap-4 p-6 bg-secondary rounded-2xl border border-gray-100">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {item.day}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {pkg.gallery && pkg.gallery.length > 0 && (
              <section>
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {pkg.gallery.map((img: any, index: number) => (
                    <img
                      key={index}
                      src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${img.asset._ref}-jpg`}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="p-8 bg-secondary rounded-3xl border border-gray-100 shadow-sm">
                <div className="mb-6">
                  <span className="text-sm text-gray-400 block uppercase tracking-wider font-semibold">Starting from</span>
                  <span className="text-4xl font-bold text-primary">${pkg.price}</span>
                </div>

                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="font-bold text-primary flex items-center gap-2 mb-3">
                      <CheckCircle size={18} className="text-green-500" /> Inclusions
                    </h3>
                    <ul className="space-y-2">
                      {pkg.inclusions?.map((inc: string, i: number) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-green-500">•</span> {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary flex items-center gap-2 mb-3">
                      <XCircle size={18} className="text-red-500" /> Exclusions
                    </h3>
                    <ul className="space-y-2">
                      {pkg.exclusions?.map((exc: string, i: number) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-red-500">•</span> {exc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="block w-full text-center bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                >
                  Book This Package
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
