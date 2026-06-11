import React from 'react'
import { getEventBySlug } from '@/lib/sanity'
import { Calendar, MapPin, Users, CheckCircle, XCircle, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

export default async function EventDetailsPage({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug)

  if (!event) {
    return <div className="pt-32 text-center">Event not found</div>
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <img 
          src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${event.featuredImage ? event.featuredImage.asset._ref : 'placeholder'}-jpg`} 
          alt={event.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">{event.title}</h1>
            <div className="flex items-center justify-center gap-4 text-white/80 text-lg">
              <span className="flex items-center gap-2"><MapPin size={20} /> {event.destination}</span>
              <span className="flex items-center gap-2"><Calendar size={20} /> {new Date(event.startDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">About This Adventure</h2>
            <div className="text-gray-600 leading-relaxed space-y-4">
              {event.description}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">Itinerary</h2>
            <div className="space-y-6">
              {event.itinerary && event.itinerary.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div className="text-gray-600">{item}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
              <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                <CheckCircle size={20} /> Included
              </h3>
              <ul className="space-y-2 text-green-700 text-sm">
                <li>✓ Professional Guides</li>
                <li>✓ All Meals and Drinks</li>
                <li>✓ Luxury Accommodation</li>
                <li>✓ Transport to and from meeting point</li>
              </ul>
            </div>
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                <XCircle size={20} /> Excluded
              </h3>
              <ul className="space-y-2 text-red-700 text-sm">
                <li>✗ International Flights</li>
                <li>✗ Visa Fees</li>
                <li>✗ Travel Insurance</li>
                <li>✗ Personal Tips</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-secondary p-8 rounded-3xl border border-gray-200 sticky top-24 shadow-sm">
            <div className="text-center mb-8">
              <span className="text-4xl font-bold text-primary">${event.price}</span>
              <p className="text-gray-500 text-sm">Per person</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Available Slots</span>
                <span className="font-bold text-primary">{event.availableSlots}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className="font-bold text-accent uppercase">{event.status}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-primary mb-4">Inquire About This Trip</h4>
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none" 
                  required 
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none" 
                  required 
                />
                <textarea 
                  placeholder="Your Message" 
                  rows={4} 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none" 
                  required 
                ></textarea>
                <button className="w-full bg-accent text-white py-4 rounded-xl font-bold hover:bg-accent-dark transition-all shadow-lg">
                  Send Inquiry
                </button>
              </form>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 text-center space-y-4">
              <div className="flex items-center justify-center gap-3 text-gray-600 text-sm">
                <Phone size={16} /> {event.contactNumber || 'Contact via form'}
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-600 text-sm">
                <Mail size={16} /> info@lessyadventures.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
