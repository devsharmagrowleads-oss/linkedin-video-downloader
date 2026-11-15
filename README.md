# LinkedDown - Free LinkedIn Video Downloader

A fully functional LinkedIn Video Downloader web app built with Next.js 16. Paste a LinkedIn post URL, extract the video, and download it in high quality — no signup, no limits, completely free.

Inspired by [Typegrow's LinkedIn Video Downloader](https://typegrow.com/tools/linkedin-video-downloader).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Video Extraction:** Cheerio (server-side HTML parsing)
- **Deployment:** Vercel (free tier)

## Features (Completed)

- [x] Paste a LinkedIn post URL and extract the embedded video
- [x] Server-side video extraction via API route (`/api/download`)
- [x] 5-strategy extraction pipeline (og:video, JSON-LD, data-sources, video tags, CDN regex)
- [x] Video preview with in-browser playback before downloading
- [x] Clipboard Paste button (uses browser Clipboard API)
- [x] Loading spinner and error state handling
- [x] Fully responsive design (mobile, tablet, desktop)
- [x] Mobile hamburger menu
- [x] 4-step how-to guide
- [x] 6 feature highlight cards
- [x] 8-item FAQ accordion
- [x] CTA banner section
- [x] Footer with disclaimer and social links
- [x] SEO metadata (Open Graph, keywords)
- [x] Production-optimized (`poweredByHeader: false`, `reactStrictMode: true`)
- [x] Clean build with zero errors/warnings

## Things Left To Do

- [ ] **Custom domain** — Connect a custom domain on Vercel
- [ ] **Proxy / rate-limit handling** — LinkedIn may block server IPs after repeated requests; add proxy rotation or caching layer
- [ ] **Redis caching** — Cache extracted video URLs to reduce duplicate LinkedIn requests
- [ ] **Analytics** — Add Plausible, PostHog, or Google Analytics for usage tracking
- [ ] **Rate limiting** — Add API rate limiting to prevent abuse (e.g., `next-rate-limit` or Upstash)
- [ ] **Error monitoring** — Integrate Sentry for production error tracking
- [ ] **Private video support** — Currently only public posts are supported
- [ ] **Download progress indicator** — Show download progress for large video files
- [ ] **Video quality selector** — Let users choose resolution (720p, 1080p, 4K) when multiple are available
- [ ] **Batch download** — Support downloading multiple videos at once
- [ ] **Browser extension** — One-click download directly from LinkedIn
- [ ] **Legal pages** — Add actual Privacy Policy and Terms of Service pages
- [ ] **Sitemap & robots.txt** — Add for better SEO crawling
- [ ] **OG image** — Create a custom Open Graph image for social sharing
- [ ] **Logo** — Design a proper LinkedDown logo/favicon
- [ ] **Related tools section** — Add links to other LinkedIn tools (carousel generator, etc.)
- [ ] **Dark mode** — Add dark mode toggle

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, Inter font, SEO metadata
│   ├── page.tsx                # Home page — assembles all sections
│   ├── globals.css             # Tailwind directives, CSS variables
│   └── api/download/
│       └── route.ts            # POST /api/download — video extraction endpoint
├── components/
│   ├── Header.tsx              # Nav bar with mobile hamburger menu
│   ├── HeroSection.tsx         # URL input + Paste/Download + video preview
│   ├── StepsGuide.tsx          # 4-step how-to guide
│   ├── FeaturesGrid.tsx        # 6 feature cards (3x2 grid)
│   ├── FAQSection.tsx          # 8 FAQ items (accordion)
│   ├── CTABanner.tsx           # Call-to-action banner
│   └── Footer.tsx              # Footer with disclaimer + links
└── lib/
    └── extract-video.ts        # Video URL extraction logic (5 strategies)
```

## Getting Started

Requires Node.js 20.18.1 or newer (needed by the `cheerio` dependency; an `.nvmrc` is included).

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. User pastes a LinkedIn post URL
2. Next.js API route fetches the page HTML server-side (with browser-like User-Agent)
3. Cheerio parses the HTML using 5 extraction strategies:
   - `og:video` / `og:video:url` meta tags
   - JSON-LD `VideoObject` structured data
   - `data-sources` attribute on video elements
   - `<video>` / `<source>` tag `src` attributes
   - Regex scan for LinkedIn CDN `.mp4` URLs
4. Direct video URL is returned to the client
5. Client shows video preview and triggers browser download

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Click **Deploy** — Vercel auto-detects Next.js, no config needed

## Limitations

- **Public posts only** — Private or restricted posts cannot be accessed
- **LinkedIn rate limiting** — LinkedIn may block server IPs after heavy usage
- **Vercel timeout** — Free tier has a 10-second API route timeout (sufficient for most requests)

## License

MIT
