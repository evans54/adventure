import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-serif font-bold text-white mb-6 block">
              LESSY ADVENTURES
            </Link>
            <p className="text-gray-300 leading-relaxed mb-6">
              Creating unforgettable travel experiences across Africa. Experience the wild, the culture, and the beauty of our continent with a trusted partner.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Explore</h4>
            <ul className="space-y-4 text-gray-300">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/events" className="hover:text-accent transition-colors">Upcoming Events</Link></li>
              <li><Link href="/packages" className="hover:text-accent transition-colors">Tour Packages</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition-colors">Travel Blog</Link></li>
              <li><Link href="/gallery" className="hover:text-accent transition-colors">Gallery</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-accent shrink-0" />
                <span>Nairobi, Kenya<br/>Riverside Drive, Suite 101</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-accent shrink-0" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-accent shrink-0" />
                <span>info@lessyadventures.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Newsletter</h4>
            <p className="text-gray-300 mb-4 text-sm">
              Subscribe to get the latest travel deals and destination guides.
            </p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                required 
              />
              <button className="bg-accent text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent-dark transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Lessy Adventures Travel & Tourism. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
