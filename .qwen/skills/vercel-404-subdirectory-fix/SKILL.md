---
name: vercel-404-subdirectory-fix
description: Resolving Vercel 404 NOT_FOUND errors caused by monorepo/subdirectory project structures
source: auto-skill
extracted_at: '2026-06-11T12:00:00.000Z'
---

# Resolving Vercel 404 NOT_FOUND in Subdirectory Projects

When a project is deployed to Vercel and returns a `404: NOT_FOUND` error with no active build logs, it typically indicates that Vercel is reaching the edge network but cannot find a deployable application in the root directory.

## Diagnostic Steps
1. **Check for Logs:** If there are no build logs in the Vercel dashboard, the platform hasn't recognized the project as a deployable app.
2. **Inspect Structure:** Identify if the framework (e.g., Next.js) is located in a subdirectory (e.g., `/frontend`) rather than the repository root.

## Solution Hierarchy (from least to most invasive)

### Level 1: Root Proxy (Soft Fix)
Create a `package.json` at the root that proxies scripts to the subdirectory:
```json
"scripts": {
  "build": "npm run build --prefix frontend",
  "dev": "npm run dev --prefix frontend"
}
```

### Level 2: Explicit Configuration (`vercel.json`)
Create a `vercel.json` at the root to explicitly define the application location:
```json
{
  "rootDirectory": "frontend",
  "buildCommand": "npm run build",
  "installCommand": "npm install"
}
```

### Level 3: Flattening the Structure (Failsafe)
If the above fail or logs still don't appear, move the application files from the subdirectory to the repository root.
- Move `app/`, `components/`, `public/`, `package.json`, and config files (e.g., `tailwind.config.js`, `next.config.js`) to the root.
- Delete the now-empty subdirectory.
- This aligns the project with Vercel's default "Zero Config" detection.

## Verification
- Commit and push changes.
- Verify that a build log appears in the Vercel dashboard.
- Ensure the build completes successfully and the URL no longer returns a 404.
