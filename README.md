# Sushmita Hostel Haven

Marketing site for `Sushmita Girls Hostel`, built with `Vite`, `React`, `TypeScript`, and `Tailwind CSS`.

## Scripts

- `npm run dev` starts the local Vite dev server.
- `npm run seo:generate` generates `robots.txt` and `sitemap.xml` when `VITE_SITE_URL` is available.
- `npm run lint` runs ESLint.
- `npm run typecheck` runs the TypeScript project build checks.
- `npm run test` runs the Vitest suite.
- `npm run build` creates the production bundle.

## Environment

- Set `VITE_SITE_URL` to your live domain before deploying SEO changes.
- Copy `.env.example` to `.env.local` for local testing if needed.

## Structure

- `src/pages/Index.tsx` composes the landing page sections.
- `src/pages/BranchPage.tsx` renders the SEO-focused branch landing pages.
- `src/components` contains the section-level UI for the site.
- `src/components/ui` contains generated `shadcn/ui` primitives.
- `src/content/site.ts` stores branch and business SEO content.
- `src/hooks/useScrollReveal.ts` handles section reveal animations.
