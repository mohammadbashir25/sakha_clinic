# SAKHA backend update notes

This update connects Blogs and Testimonials to MongoDB and adds English, Dari (`fa`), and Pashto (`ps`) fields to their admin forms.

## Environment

Copy `.env.example` to `.env.local` and fill in your own values:
- `MONGODB_URI`: your MongoDB Atlas connection string
- `AUTH_SECRET`: a long, random secret used for the admin session cookie

Never commit `.env.local` or send it in a project archive.

## What changed

- `models/Blog.ts`: stores a shared slug/category/cover image/status and a complete `translations` object for `en`, `fa`, and `ps`.
- `app/api/admin/blogs/route.ts` and `app/api/admin/blogs/[id]/route.ts`: authenticated blog CRUD with validation and duplicate-slug checks.
- `components/admin/blog/BlogForm.tsx`: language tabs and translation fields; saves to the real API.
- Blog add/edit pages: now create/read/update MongoDB records instead of using the in-memory mock store.
- `models/Testimonial.ts`: multilingual testimonial schema.
- `app/api/admin/testimonials/route.ts` and `app/api/admin/testimonials/[id]/route.ts`: authenticated testimonial CRUD and publish toggle.
- `components/admin/testimonials/TestimonialForm.tsx` and dashboard page: language tabs and API-backed create/edit/publish/delete.
- `components/home/Testimonials/getTestimonials.ts`: public site queries published testimonials from MongoDB in the active locale.
- `components/blog/data.ts`: public blog listing and article pages query published MongoDB blogs in the active locale.
- `BlogFeaturedImageField.tsx`: lets an administrator upload a cover image from a computer or phone to Vercel Blob and saves the returned public URL with the blog.

## Run locally

```bash
npm install
npm run dev
```

Then sign in to `/admin/login`, create a blog in all three languages, save it as a draft first, and verify it appears in `/admin/blogs`. Publish only after checking the public `/en/blog`, `/fa/blog`, and `/ps/blog` pages. Repeat the same flow for testimonials.

## Data compatibility

Existing single-language blog documents can still be listed and opened in the admin. When editing one, the old English fields are prefilled; Dari and Pashto translations must be entered before saving because the updated form requires all three languages. Old documents may need to be edited and saved before they display as fully translated articles.

## Verification status

The changed TypeScript/TSX files passed TypeScript transpilation syntax checks. A full project typecheck, ESLint run, MongoDB CRUD test, and production build were not run in this environment; run those in the actual project directory before deployment.

## Blog cover image uploads (Vercel Blob)

The blog form now lets an administrator choose an image directly from a computer or phone. The browser uploads the image directly to Vercel Blob using the `@vercel/blob/client` SDK; MongoDB stores only the resulting public URL in `coverImage`.

Setup:
1. Install the dependency with `npm install @vercel/blob` (this also updates `package-lock.json`).
2. In the Vercel project, create a Blob store and add its `BLOB_READ_WRITE_TOKEN` to the project's environment variables. For local development, put the token in `.env.local` (never commit it).
3. Restart the development server after changing environment variables.

Accepted file types: JPG/JPEG, PNG, WebP, AVIF. Maximum size: 5 MB. The upload-token endpoint is protected by the existing admin session and restricts uploads to the `blog-covers/` path. This change applies to blog cover images; it does not add a separate media library/dashboard.
