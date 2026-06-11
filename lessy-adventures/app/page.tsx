import React from 'react'
import { ArrowRight, MapPin, Star, TrendingUp, Users, Globe } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1516026677156-182C1f77c859?q=80&w=2000" 
          alt="Safari Adventure" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Discover the Untamed <br /> Beauty of <span className="text-accent">Africa</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Embark on a journey of a lifetime with Lessy Adventures. From the golden savannahs to the crystal clear beaches, we curate premium experiences for the modern traveler.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-accent text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-accent-dark transition-all shadow-lg flex items-center justify-center gap-2">
              Explore Packages <ArrowRight size={20} />
            </button>
            <button className="bg-white text-primary px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all shadow-lg">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe size={32} />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">50+</h3>
              <p className="text-gray-500 font-medium">Destinations Visited</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">10k+</h3>
              <p className="text-gray-500 font-medium">Travelers Served</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
              <p className="text-gray-500 font-medium">Trips Organized</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">4.9/5</h3>
              <p className="text-gray-500 font-medium">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Trips Section (Placeholder for Sanity) */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-serif font-bold text-primary mb-4">Featured Adventures</h2>
              <p className="text-lg text-gray-600">Handpicked destinations that offer the perfect blend of adventure, luxury, and authenticity.</p>
            </div>
            <button className="text-primary font-bold flex items-center gap-2 hover:text-primary-light transition-colors">
              View All Packages <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-1${i}5000000000000?q=80&w=800`} 
                    alt="Destination" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <MapPin size={14} />
                    <span>Kenya, East Africa</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-primary-light transition-colors">
                    Maasai Mara Luxury Safari
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    Experience the great migration and witness the raw beauty of the savannah in ultimate luxury.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">$1,200 <span className="text-sm text-gray-400 font-normal">/ person</span></span>
                    <button className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                      Details <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
