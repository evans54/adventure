import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to true for production
})

export async function getUpcomingEvents() {
  return await client.fetch(
    `*[_type == "event" && status == "upcoming"] | order(startDate asc)`
  )
}

export async function getEventBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "event" && slug.current == $slug][0]`,
    { slug }
  )
}
