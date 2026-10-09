# Sakha production setup

## Required environment variables

Copy `.env.example` into `.env.local` for local development, then fill in the values. Add the same values in your hosting provider's production environment settings. Never commit `.env.local` or any API keys.

- `MONGODB_URI`: MongoDB Atlas connection string. Ensure Atlas Network Access allows your deployment and the database user has the required read/write permissions.
- `AUTH_SECRET`: a long, random, private value used for admin sessions.
- `NEXT_PUBLIC_SITE_URL`: the final HTTPS domain, without a trailing slash.
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob token for blog cover image uploads.
- `RESEND_API_KEY`: Resend API key used by the contact form email endpoint.
- `RESEND_FROM_EMAIL`: sender identity verified in Resend. A Gmail address is not normally a valid sender unless it is verified with Resend; use a verified domain address.

## Email behavior

The contact form sends appointment requests to `drsakha98@gmail.com` through Resend. The form returns an error rather than falsely reporting success if email credentials are missing or Resend rejects the message.

## Before launch

1. Install dependencies from the project root with `npm install`. The uploaded lock file was intentionally omitted because it did not include the declared Vercel Blob dependency; npm will generate a fresh `package-lock.json`.
2. Set all production environment variables.
3. Confirm the configured Vercel Blob hostname in `next.config.ts` matches the public Blob URL for your deployment; update it if your storage hostname differs.
4. Run `npx tsc --noEmit` and `npm run build` after installing dependencies.
5. Test an appointment request and confirm the message arrives at the clinic inbox.
6. Log in to `/admin`, create/edit/publish a blog post and testimonial, then verify the public site updates.
7. Use HTTPS and keep admin credentials/API keys private.
