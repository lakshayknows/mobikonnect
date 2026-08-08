# Mobikonnect — Website Revamp

A premium, "awwwards-grade" rebuild of [mobikonnect.com](https://mobikonnect.com) for
**Mobikonnect / Parv Communications Pvt. Ltd.** — a full-service mobile marketing &
advertising agency.

The site takes a dark, framed, curved-panel aesthetic (inspired by the reference brief)
and pairs it with smooth scrolling, masked type reveals, parallax and scroll-driven
motion to make the agency's work feel as energetic as the campaigns it runs.

---

## 1. System design

### 1.1 Tech stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 14 (App Router)** + TypeScript | SSG output, first-class SEO/metadata, file-based icons & sitemap |
| Styling | **Tailwind CSS** | Token-driven design system, zero runtime cost |
| Motion | **Framer Motion** | Scroll reveals, parallax, magnetic/spring interactions |
| Smooth scroll | **Lenis** | The signature buttery scroll, with `prefers-reduced-motion` fallback |
| Icons | **lucide-react** | Consistent, lightweight line icons |

Output is fully static (`next build` → prerendered HTML), ~143 kB first-load JS.

### 1.2 Design system (spec-driven)

Driven by the exact brand spec and matched to the MobiKonnect logo.

| Token | Value | Role |
|-------|-------|------|
| `ink` | `#262626` | Site-wide frame / background |
| `blue` | `#0999D5` | Hero curved frame, brand primary |
| `coral` | `#D05E62` | Accent — CTAs, highlights, indices |
| `cream` | `#F8EBD3` | Typography & UI on dark |
| Radius `frame` | `43px` | Curved section roundness |
| Gutter | `75px` | Side margins (fluid down on mobile) |

- **Type pairing:** **Montserrat** (display / headings) + **Karla** (body) — loaded via
  `next/font` and exposed as `--font-display` / `--font-body`.
- **Fluid scale:** `mega → giant → huge → big`, all `clamp()`-based so type is responsive
  without breakpoints.
- **Curved frame** is the core motif: every major section is a `rounded-[43px]` panel sitting
  on the `#262626` background within the `75px` gutter, alternating blue / coral / dark fills
  to create rhythm.

### 1.3 Information architecture (scroll order)

1. **Hero** — blue curved frame, masked headline, parallax monogram, brand ticker
2. **About** — editorial manifesto + 3 pillars (Rewards · Technology · Insight)
3. **Stats** — coral frame with animated counters (15+, 5,00,000+, ₹50L+, 90,000+)
4. **Expertise** — 8 specialisms as curved cards
5. **Technology** — orbital "capability wheel" (8 platforms) + interactive list
6. **Process** — pinned, scroll-driven horizontal timeline (7 end-to-end steps)
7. **Why brands** — the 5-point brand upside, sticky-header list
8. **Work** — 6 flagship case studies with metrics (Oreo×Pokémon, McDonald's, Perk, ITC, Panasonic, Dabur)
9. **Clients** — blue frame, dual-direction marquee of 15 brands
10. **Contact** — gradient frame CTA, email/phone, footer

### 1.4 Component architecture

```
app/
  layout.tsx        fonts, metadata, SmoothScroll + Cursor + Navbar + Footer shell
  page.tsx          composes the 10 sections
  globals.css       design tokens, base styles, helpers (.gutter .frame .eyebrow …)
  icon.svg          monogram favicon · robots.ts · sitemap.ts
components/
  layout/           SmoothScroll · Cursor · Navbar · Footer
  sections/         Hero · About · Stats · Expertise · Technology · Process · WhyBrands · Work · Clients · Contact
  ui/               Logo · Reveal/RevealText · Counter · Marquee · MagneticButton · SectionHeader
lib/
  content.ts        single source of truth for all copy & data (from the company deck)
  cn.ts             className helper
```

### 1.5 Motion principles

- **Smooth scroll** everywhere (Lenis); in-page anchors glide via `scrollTo`.
- **Masked reveals** — headlines split into words that slide up out of an overflow mask.
- **Scroll-driven** — hero parallax and the pinned horizontal Process track use `useScroll`.
- **Micro-interactions** — magnetic buttons, a blend-mode custom cursor, hover lifts.
- **Accessible** — all of the above collapse gracefully under `prefers-reduced-motion`.

### 1.6 Content

All copy and data live in `lib/content.ts`, extracted from the official company deck —
expertise, technological capabilities, end-to-end process, brand benefits, case-study
metrics and the client roster. Update that one file to update the site.

> **Note:** phone numbers were not machine-readable in the source deck and are placeholders
> in `lib/content.ts` — verify before launch. The email `team@mobikonnect.com` is from the deck.

---

## 2. Getting started

```bash
npm install      # install dependencies
npm run dev      # dev server at http://localhost:3000
npm run build    # production build (static)
npm run start    # serve the production build
```

Deploy anywhere that runs Next.js (Vercel recommended).

---

## 3. Blog & admin CMS

The marketing pages are still static and driven by `lib/content.ts`. The **blog**
is different: posts live in Postgres and are authored through an admin portal, so
the marketing team can publish without a deploy.

| Surface | URL | Notes |
| --- | --- | --- |
| Blog index | `/blog` | Category + tag filters, pagination, featured post |
| Post | `/blog/[slug]` | ISR (`revalidate = 60`) + on-demand revalidation on publish |
| RSS | `/blog/rss.xml` | 50 most recent published posts |
| Case studies | `/CaseStudies` | Ordered by display order; homepage shows the first six |
| Case study | `/CaseStudies/[slug]` | ISR (`revalidate = 60`) |
| Admin | `admin.mobikonnect.com` | `/admin` in local dev |

### 3.1 One-time setup

```bash
vercel login
vercel link

vercel integration add neon --yes   # Postgres  → DATABASE_URL
vercel integration add blob --yes   # Media     → BLOB_READ_WRITE_TOKEN
vercel env pull .env.local --yes

npm run db:push                     # create the tables
npm run db:seed                     # first admin user + starter categories
npm run db:seed:case-studies        # import the 20 existing case studies
```

`db:seed:case-studies` reads the array in `lib/content.ts` and inserts any slug not
already present. It is idempotent and never overwrites an edit made in the admin, so
it is safe to re-run.

`db:seed` reads `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` if set, otherwise it
creates `sales@mobikonnect.com` and prints a generated password **once**.

Add the subdomain:

```bash
vercel domains add admin.mobikonnect.com
```

`mobikonnect.com` uses third-party nameservers (GoDaddy), so Vercel cannot create the
record itself. Add this at the DNS provider:

| Type | Name | Value |
| --- | --- | --- |
| A | `admin` | `76.76.21.21` |

Vercel re-verifies automatically and issues TLS once the record propagates — check with
`vercel domains inspect admin.mobikonnect.com`.

### 3.2 What the CMS does

**Posts** — rich-text editing (Tiptap), auto-slug with live uniqueness checking, cover
and inline images via Vercel Blob, categories and tags, draft / scheduled / published
states, scheduling that goes live on its own, an SEO panel with a live search-result
preview, per-save revision history with restore, and bulk publish/draft/delete.

**Case studies** — the same shell, with the fields the case-study template actually
uses: brand, campaign title, category, summary, challenge / objective / solution,
repeatable technology and results lists, paired value+label metrics, blue/coral card
accent, hero image *or* campaign video, draft/published, and a display order that also
decides the homepage six. Body fields are plain text, not rich text, because the
template renders them as plain paragraphs.

Shared across both: a media library, and multi-user accounts with `admin` / `editor`
roles.

> **Case studies are database-driven.** The array in `lib/content.ts` is seed data only
> — editing it does not change the site. Edit in the admin instead.

### 3.3 Architecture notes

- `app/` is split into two route groups: `(site)` keeps the marketing chrome
  (Lenis, cursor, navbar, footer); `(admin)` renders a plain shell. **Route groups do
  not change URLs** — every existing path is unchanged.
- `middleware.ts` does host routing only: it maps `admin.` onto `/admin` and 404s
  `/admin` on the public domain in production. **It performs no auth checks.**
  Authorization lives in `lib/auth.ts` and is called by every admin page and every
  server action — see `design_constraint.md` §10.
- Post HTML is sanitized server-side (`lib/sanitize.ts`) before it is stored, because
  the public page renders it with `dangerouslySetInnerHTML`.
- Passwords use Node's built-in `crypto.scrypt`; sessions are opaque random tokens
  stored as SHA-256 hashes in the `sessions` table, so sign-out revokes server-side.

### 3.4 Scripts

```bash
npm run db:push              # push schema changes to the database
npm run db:generate          # generate a SQL migration instead
npm run db:studio            # browse the data
npm run db:seed              # create the first admin user
npm run db:seed:case-studies # import case studies from lib/content.ts
```

`db:push` prompts for confirmation and needs a TTY; in a non-interactive shell add
`--force` (`npx dotenv -e .env.local -- npx drizzle-kit push --force`). Check the
printed statements first — `--force` also applies destructive ones.

**Do not run `npm run build` while `npm run dev` is running.** They share `.next/`, and
the production build overwrites the dev server's static assets, which makes every page
load unstyled until you restart dev.

---

## 4. Brand palette quick reference

```
#262626  ink     — frame / background
#0999D5  blue    — hero frame / primary
#D05E62  coral   — accent
#F8EBD3  cream   — text
```
