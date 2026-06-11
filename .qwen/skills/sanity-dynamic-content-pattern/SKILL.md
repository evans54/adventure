---
name: sanity-dynamic-content-pattern
description: implementing linked content systems in Sanity CMS for Next.js 15 (Packages, Blogs, Galleries)
source: auto-skill
extracted_at: '2026-06-11T07:45:00.000Z'
---

# Sanity Dynamic Content Pattern

## Approach
When building a content-heavy site with interconnected entities (e.g., Travel Packages $\rightarrow$ Categories, Blog Posts $\rightarrow$ Categories), use a "Reference-Driven Architecture" in Sanity to ensure data integrity and ease of management.

## 1. Schema Design
- **Category Documents:** Create standalone documents for categories (e.g., `packageCategory`, `blogCategory`). This avoids hardcoded lists and allows adding metadata (descriptions, featured images) to the category itself.
- **Reference Fields:** In the main content document (e.g., `travelPackage`), use `type: 'reference'` pointing to the category document.
- **Status Management:** Include a `status` field (e.g., `draft`, `published`, `archived`) to decouple content creation from public visibility.

## 2. Frontend Data Fetching (GROQ)
- **Join Queries:** Use the `->` operator in GROQ to dereference categories and fetch their data in a single request.
  - *Example:* `*[_type == "travelPackage"][0]{ ..., "category": category-> }`
- **Dynamic Filtering:** Implement category filtering via URL search parameters (e.g., `?category=beach`). Use the `references()` function in GROQ to filter documents by a category's ID or slug.
  - *Example:* `*[_type == "travelPackage" && references(^)_@.slug.current == $slug]`

## 3. Routing Strategy
- **Listing Pages:** Use a single `page.tsx` for the main list that handles both "All" and "Category" views via `searchParams`.
- **Detail Pages:** Use dynamic routes `[slug]/page.tsx` and `getBlogPostBySlug` / `getTravelPackageBySlug` helper functions for SEO-friendly URLs.

## 4. Implementation Checklist
- [ ] Define Category Schema
- [ ] Define Main Content Schema with Reference
- [ ] Create `lib/sanity.ts` fetchers with dereferencing
- [ ] Implement Listing page with `searchParams` filtering
- [ ] Implement Detail page with `notFound()` handling
