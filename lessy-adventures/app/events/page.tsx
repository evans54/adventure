import React from 'react'
import Link from 'next/link'
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react'
import { getUpcomingEvents } from '@/lib/sanity'

export default async function EventsPage() {
  const events = await getUpcomingEvents()

  return (
    <div className="min-h-screen bg-secondary pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">Upcoming Adventures</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us on our next journey. Browse through our scheduled events and secure your spot for an unforgettable experience.
          </p>
        </div>

        {events && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event: any) => (
              <div key={event._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${event.featuredImage ? event.featuredImage.asset._ref : 'placeholder'}-jpg`} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {event.status}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-primary mb-3">{event.title}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                      <MapPin size={16} className="text-primary" />
                      <span>{event.destination}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                      <Calendar size={16} className="text-primary" />
                      <span>{new Date(event.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - {new Date(event.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                      <Users size={16} className="text-primary" />
                      <span>{event.availableSlots} slots available</span>
                    </div>
                  </div>

                  <div className="mt-auto flex justify-between items-center pt-6 border-t border-gray-100">
                    <span className="text-2xl font-bold text-primary">${event.price}</span>
                    <Link 
                      href={`/events/${event.slug.current}`} 
                      className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2"
                    >
                      View Details <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <h3 className="text-xl font-medium text-gray-400">No upcoming events scheduled at the moment. Check back soon!</h3>
          </div>
        )}
      </div>
    </div>
  )
}
