---
name: vercel-404-subdirectory-fix
description: Resolving Vercel 404 NOT_FOUND errors and "command not found" build failures caused by subdirectory project structures
source: auto-skill
extracted_at: '2026-06-11T12:00:00.000Z'
---

# Resolving Vercel 404 NOT_FOUND in Subdirectory Projects

When a project is deployed to Vercel and returns a `404: NOT_FOUND` error or fails during build with `command not found` (e.g., `next: command not found`), it typically indicates that Vercel cannot find the deployable application or its dependencies in the expected directory.

## Diagnostic Steps
1. **Check for Logs:** If there are no build logs in the Vercel dashboard, the platform hasn't recognized the project as a deployable app.
2. **Inspect Structure:** Identify if the framework (e.g., Next.js) is located in a subdirectory (e.g., `/frontend`) rather than the repository root.
3. **Analyze Build Logs:** If `npm install` runs at the root but the build fails with `command not found`, it means dependencies were installed in the wrong directory relative to the build command.

## Solution Hierarchy (from least to most invasive)

### Level 1: Root Proxy (Soft Fix)
Create a `package.json` at the root that proxies scripts to the subdirectory:
```json
"scripts": {
  "build": "npm run build --prefix frontend",
  "dev": "npm run dev --prefix frontend"
}
```
*Note: This may still fail if the `installCommand` doesn't also target the subdirectory.*

### Level 2: Explicit Configuration (`vercel.json` and UI)
Use a combination of `vercel.json` and the Vercel Dashboard:
- **Vercel Dashboard:** Set the **Root Directory** to the specific subfolder (e.g., `frontend`).
- **vercel.json:** Define the installation and build commands. Note that `rootDirectory` is not a valid property inside `vercel.json` and must be set in the UI.
```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install --legacy-peer-deps"
}
```

### Level 3: Flattening the Structure (Failsafe/Recommended)
If the above fail or lead to complex pathing issues, move the application files from the subdirectory to the repository root.
- Move `app/`, `components/`, `public/`, `package.json`, and config files (e.g., `tailwind.config.js`, `next.config.js`, `middleware.ts`) to the root.
- This aligns the project with Vercel's default "Zero Config" detection, ensuring that `npm install` and `npm run build` occur in the same directory.

## Verification
- Commit and push changes.
- Verify that a build log appears in the Vercel dashboard.
- Ensure the build completes successfully and the URL no longer returns a 404.
