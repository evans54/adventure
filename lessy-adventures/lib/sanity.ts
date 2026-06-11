import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to true for production
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export async function getBlogPosts() {
  return await client.fetch(
    `*[_type == "blogPost" && status == "published"] | order(publishedAt desc)`
  )
}

export async function getBlogPostBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      ...,
      "category": category->
    }`,
    { slug }
  )
}

export async function getBlogCategories() {
  return await client.fetch(`*[_type == "blogCategory"] | order(title asc)`)
}

export async function searchBlogPosts(query: string) {
  return await client.fetch(
    `*[_type == "blogPost" && status == "published" && (title match $query || excerpt match $query)] | order(publishedAt desc)`,
    { query: \`*\${query}*\` }
  )
}

export async function getGalleryImages() {
  return await client.fetch(`*[_type == "galleryImage"] | order(_createdAt desc)`)
}

export async function getGalleryImagesByDestination(destination: string) {
  return await client.fetch(
    `*[_type == "galleryImage" && destination == $destination] | order(_createdAt desc)`,
    { destination }
  )
}

export async function getUniqueDestinations() {
  return await client.fetch(`*[_type == "galleryImage"].destination`)
}

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

export async function getPackageCategories() {
  return await client.fetch(`*[_type == "packageCategory"] | order(title asc)`)
}

export async function getTravelPackages() {
  return await client.fetch(
    `*[_type == "travelPackage" && status == "published"] | order(_createdAt desc)`
  )
}

export async function getTravelPackagesByCategory(slug: string) {
  return await client.fetch(
    `*[_type == "travelPackage" && status == "published" && references(^)_@.slug.current == $slug]`,
    { slug }
  )
}

export async function getTravelPackageBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "travelPackage" && slug.current == $slug][0]{
      ...,
      "category": category->
    }`,
    { slug }
  )
}
