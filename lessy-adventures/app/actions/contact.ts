'use server'

import { client } from '@/lib/sanity'
import { revalidatePath } from 'next/cache'

export async function submitInquiry(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  if (!name || !email || !subject || !message) {
    return { success: false, error: 'All fields are required.' }
  }

  try {
    // Note: To actually write to Sanity from a server action, 
    // you need a token with write permissions.
    // This implementation assumes the client is configured or using a token.
    await client.create({
      _type: 'inquiry',
      name,
      email,
      subject,
      message,
      status: 'new',
      createdAt: new Date().toISOString(),
    })

    revalidatePath('/contact')
    return { success: true }
  } catch (error) {
    console.error('Inquiry Error:', error)
    return { success: false, error: 'Failed to send message. Please try again later.' }
  }
}
