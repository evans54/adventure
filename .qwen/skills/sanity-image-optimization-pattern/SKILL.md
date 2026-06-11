---
name: sanity-image-optimization-pattern
description: professional implementation of Sanity Image API for optimized asset delivery in Next.js
source: auto-skill
extracted_at: '2026-06-11T08:15:00.000Z'
---

# Sanity Image Optimization Pattern

## Approach
Avoid using raw Sanity asset URLs in the frontend. Instead, use the `@sanity/image-url` builder to generate optimized, resized, and formatted image URLs on the fly. This reduces PageSpeed LCP (Largest Contentful Paint) and improves mobile performance.

## 1. Implementation Setup
Install the utility: `npm install @sanity/image-url`

Configure the builder in `lib/sanity.ts`:
```typescript
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client' // your sanity client

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
```

## 2. Optimized Usage Patterns
Replace template literals with the `urlFor` helper to specify dimensions and quality:

- **Thumbnails/Cards:** Use explicit width/height to avoid downloading huge assets.
  - `urlFor(pkg.featuredImage).width(600).height(400).url()`
- **Hero Images:** Use higher resolution but keep specific dimensions.
  - `urlFor(post.mainImage).width(1200).url()`
- **Dynamic Gallery:** Use the builder to ensure consistent aspect ratios.

## 3. Integration Checklist
- [ ] Install `@sanity/image-url`
- [ ] Create `urlFor` helper in Sanity library
- [ ] Audit all `<img>` tags to replace raw URLs with `urlFor().url()`
- [ ] Add specific `.width()` and `.height()` constraints based on UI layout (e.g., 600px for cards, 1200px for hero)
- [ ] Ensure fallback images (placeholders) are handled if the asset is missing
