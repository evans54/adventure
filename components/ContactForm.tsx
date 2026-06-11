'use client'

import React, { useState } from 'react'
import { submitInquiry } from '@/app/actions/contact'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(formData: FormData) {
    setStatus('loading')
    const result = await submitInquiry(formData)
    
    if (result.success) {
      setStatus('success')
      setMessage('Your message has been sent successfully! We will get back to you soon.')
    } else {
      setStatus('error')
      setMessage(result.error || 'Something went wrong.')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center p-8 bg-green-50 rounded-3xl border border-green-100">
        <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
        <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
        <p className="text-green-600">{message}</p>
        <button 
          onClick={() => setStatus('idle')} 
          className="mt-6 text-green-700 font-semibold hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input 
            name="name" 
            type="text" 
            required 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            name="email" 
            type="email" 
            required 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input 
            name="subject" 
            type="text" 
            required 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="Booking Inquiry"
          />
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea 
            name="message" 
            required 
            rows={8}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
            placeholder="Tell us about your dream trip..."
          />
        </div>
        <button 
          disabled={status === 'loading'}
          className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
        >
          {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
            <AlertCircle size={16} />
            {message}
          </div>
        )}
      </div>
    </form>
  )
}
