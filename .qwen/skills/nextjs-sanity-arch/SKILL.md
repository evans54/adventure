---
name: nextjs-sanity-arch
description: architectural setup for a professional Next.js 15 and Sanity CMS project with security focus
source: auto-skill
extracted_at: '2026-06-10T13:01:58.537Z'
---

# Next.js 15 & Sanity CMS Professional Architecture

## Approach
For high-end professional sites (like travel agencies) requiring trust, AdSense approval, and CMS flexibility, use a strict decoupled structure.

## 1. Folder Structure
Divide the repository into `frontend` (Next.js) and `backend` (Sanity Studio) to maintain a clean separation of concerns.
- `frontend/`: App Router, Server Actions, and UI components.
- `backend/`: Sanity schemas and studio configuration.

## 2. Security Baseline
- **Middleware:** Implement a `middleware.ts` file at the root of the frontend to inject security headers:
    - `X-Frame-Options: DENY`
    - `X-Content-Type-Options: nosniff`
    - `Content-Security-Policy (CSP)`
- **Environment Variables:** Use `.env.example` to document required keys; keep secrets in `.env.local`.

## 3. Sanity Integration
- Use `sanity.config.ts` for studio settings.
- Define schemas in `schemaTypes/` to allow non-technical admins to manage dynamic content (Events, Blogs, Packages).
- Use the Sanity Content Lake as the sole source of truth for data.

## 4. Setup Procedure
1. Scaffold `frontend` and `backend` directories.
2. Initialize Next.js with Tailwind and TypeScript.
3. Initialize Sanity studio.
4. Configure security middleware before building any pages.
5. Link frontend to Sanity using a project ID and dataset.
