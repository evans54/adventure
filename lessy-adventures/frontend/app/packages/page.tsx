import React from 'react'
import Link from 'next/link'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { getPackages } from '@/lib/sanity'

export default async function PackagesPage() {
  const packages = await getPackages()

  const categories = [
    { id: 'beach', name: 'Beach Packages', icon: '🏖️' },
    { id: 'hiking', name: 'Hiking Packages', icon: '🥾' },
    { id: 'weekend', name: 'Weekend Getaways', icon: '🌅' },
    { id: 'group', name: 'Group Tours', icon: '👥' },
    { id: 'corporate', name: 'Corporate Retreats', icon: '💼' },
    { id: 'international', name: 'International Trips', icon: '✈️' },
  ]

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">Curated Tour Packages</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From serene beaches to rugged mountains, we have a package for every type of adventurer.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/packages?category=${cat.id}`} 
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary border border-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300 font-medium"
            >
              <span>{cat.icon}</span> {cat.name}
            </Link>
          ))}
        </div>

        {packages && packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg: any) => (
              <div key={pkg._id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${pkg.images?.[0]?.asset._ref || 'placeholder'}-jpg`} 
                    alt={pkg.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase">
                    {pkg.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-primary group-hover:text-primary-light transition-colors">{pkg.name}</h3>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <Clock size={14} /> {pkg.duration}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    {pkg.description}
                  </p>
                  <div className="mt-auto flex justify-between items-center pt-6 border-t border-gray-100">
                    <div>
                      <span className="text-sm text-gray-400 block">Starting from</span>
                      <span className="text-2xl font-bold text-primary">${pkg.price}</span>
                    </div>
                    <Link 
                      href={`/packages/${pkg.slug.current}`} 
                      className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-primary-dark transition-all flex items-center gap-2"
                    >
                      Explore <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-secondary rounded-3xl border border-dashed border-gray-300">
            <h3 className="text-xl font-medium text-gray-400">No packages available at the moment. We are crafting new adventures!</h3>
          </div>
        )}
      </div>
    </div>
  )
}
