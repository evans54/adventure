import React from 'react'
import Link from 'next/link'
import { MapPin, Clock, ArrowRight, LayoutGrid } from 'lucide-react'
import { getTravelPackages, getPackageCategories, getTravelPackagesByCategory } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'


export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  
  let packages = await getTravelPackages()
  const categories = await getPackageCategories()

  if (category) {
    packages = await getTravelPackagesByCategory(category)
  }

  return (
    <div className="min-h-screen bg-secondary pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">Curated Travel Packages</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully crafted itineraries designed for every type of traveler. From luxury retreats to rugged adventures.
          </p>
        </div>

        {/* Category Filter Section */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Link
            href="/packages"
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              !category 
              ? 'bg-primary text-white hover:bg-primary-dark' 
              : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
            }`}
          >
            All Packages
          </Link>
          {categories && categories.map((categoryItem: any) => (
            <Link
              key={categoryItem._id}
              href={`/packages?category=${categoryItem.slug.current}`}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                category === categoryItem.slug.current 
                ? 'bg-primary text-white hover:bg-primary-dark' 
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              {categoryItem.title}
            </Link>
          ))}
        </div>

        {packages && packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg: any) => (
              <div key={pkg._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={urlFor(pkg.featuredImage).width(600).height(400).url()}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-primary">{pkg.title}</h3>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                      <MapPin size={16} className="text-primary" />
                      <span>{pkg.destination}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                      <Clock size={16} className="text-primary" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex justify-between items-center pt-6 border-t border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-400 block">Starting from</span>
                      <span className="text-2xl font-bold text-primary">${pkg.price}</span>
                    </div>
                    <Link
                      href={`/packages/${pkg.slug.current}`}
                      className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2"
                    >
                      Explore <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="flex justify-center mb-4">
              <LayoutGrid size={48} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-medium text-gray-400">No travel packages available at the moment. Stay tuned!</h3>
          </div>
        )}
      </div>
    </div>
  )
}
