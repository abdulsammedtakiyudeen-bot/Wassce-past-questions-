# WASSCE Study 1

A professional, mobile-first WASSCE revision platform and installable PWA for Ghanaian students.

**Independent project:** WASSCE Study is not affiliated with, endorsed by, or representative of WAEC. Official examination information must be confirmed through WAEC Ghana.

## Included in this build

- Responsive study dashboard with quick stats and study progress.
- Resource library with subject/year/type search and filters.
- Past Questions, answers/marking material, mocks, super mocks and study guidance.
- Saved resources / My Downloads with service-worker caching for opened PDFs.
- Timed mock engine, review explanations and local results.
- My Progress dashboard.
- Examiner-report revision summaries clearly labelled as unofficial.
- Study Guides, Examination Guides and Do's & Don'ts.
- About, Contact, Privacy Policy, Terms and Disclaimer pages.
- Account UI with local fallback sign-in and backend-ready email/password authentication.
- Google OAuth login flow ready for configuration.
- PWA manifest, install prompt, offline page, service worker, icons and GitHub Pages 404 fallback.
- SEO metadata, robots.txt and sitemap.xml.
- AdSense-ready layout with reserved ad inventory; no fake publisher ID or unapproved ad code is included.
- Low-data, touch-friendly mobile UI and dark mode.
- Expandable JSON/data architecture for adding many subjects and resources.

## Run with Vite

```bash
pnpm install
pnpm --filter @workspace/wassce-study run dev
```

Build:

```bash
pnpm --filter @workspace/wassce-study run build
```

## Optional backend

The `server/index.mjs` file provides:

- `GET /api/health`
- `GET /api/me`
- `POST /api/auth/local` for email/password sign-up and sign-in
- `GET /api/auth/google/start`
- `GET /api/auth/google/callback`
- `GET /api/logout`

It uses Node's built-in HTTP, crypto and fetch APIs. Local account passwords are stored as salted scrypt hashes. Sessions use signed, HttpOnly cookies.

Copy `.env.example` to `.env` and configure:

```text
PORT=3000
SESSION_SECRET=use-a-long-random-secret
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
VITE_GOOGLE_CLIENT_ID=
```

For Google OAuth, create a Google Cloud OAuth 2.0 **Web application** credential. Add the exact callback URI used by your deployment. Do not commit client secrets to GitHub.

Start the API/static server after building:

```bash
pnpm run build
pnpm run start
```

### Important deployment distinction

GitHub Pages is static hosting, so the Node backend cannot run there. The PWA and device-only account fallback can run on GitHub Pages, but real Google OAuth and server-side account syncing require a backend host such as your Replit deployment or another Node-capable service.

For a production setup, use HTTPS and keep the API on the same site/domain where possible.

## Google AdSense readiness

This project deliberately does **not** contain a made-up AdSense publisher ID. Before approval:

1. Publish the site with working navigation and original/authorized content.
2. Make sure About, Contact, Privacy, Terms and Disclaimer pages are reachable.
3. Add your real AdSense publisher snippet only after Google provides the publisher ID.
4. Create `public/ads.txt` with the exact line supplied by Google AdSense for your account.
5. Keep ads away from answer choices, navigation, download controls and deceptive buttons.
6. Update the privacy policy to match the actual Google advertising/cookie configuration you enable.

See `ADSENSE_SETUP.md`.

## Adding resources

Inspect every PDF's actual contents before classifying it. Do not use filenames as proof of subject, year, paper or official status. Keep duplicate detection and rights notes honest.

Add PDFs to `public/resources/` and update `src/data.ts` (and `public/data/resources.json` if another consumer uses the catalog).

## GitHub Pages

The intended project URL is:

`https://abdulsammedtakiyudeen-bot.github.io/WASSCE-Study1/`

The project includes a GitHub Pages-friendly 404 fallback and PWA manifest. Configure GitHub Pages to publish the Vite `dist/public` output.

## Contact

Abdul Sammed Takiyudeen  
abdulsammedtakiyudeen@gmail.com
