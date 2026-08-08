# Design Constraints

Rules established for this site's visual system. Follow these for any future
change — if a request conflicts with one of these, flag it instead of
silently overriding it.

## 1. No new aesthetic without explicit sign-off

The visual language (curved-frame panels, motion language, type scale,
component shapes) is locked. Content, copy, routes and datasets can expand
freely — the *look* should not change unless the user explicitly asks for a
design change. Color swaps are the one exception that has been pre-approved
(see below).

## 2. Color palette — dark theme, grey ink background, offwhite cream text

Defined in [tailwind.config.ts](tailwind.config.ts):

| Token | Value | Role |
| --- | --- | --- |
| `ink` (DEFAULT) | `#262626` | **Page background**, plus raised-card/overlay surfaces |
| `ink-deep` | `#1d1d1d` | Darkest surfaces (mobile menu overlay) |
| `ink-soft` | `#2f2f2f` | Card surfaces, hover states |
| `blue` (DEFAULT) | `#0999D5` | Bright-blue accent panels (Hero, Clients) |
| `blue-deep` / `blue-dark` | `#0a7bac` / `#06547a` | Panel gradient shades |
| `coral` (DEFAULT) | `#D05E62` | Red accent — CTAs, highlights, hover states |
| `coral-deep` | `#b84a4e` | Coral hover/pressed |
| `cream` (DEFAULT) | `#F8EBD3` | **Primary text color**, plus light text on colored panels |
| `cream-dim` / `cream-faint` / `cream-line` | rgba variants of cream | Secondary text / muted text / hairline borders |

**This is the confirmed, current baseline** — body is `bg-ink text-cream`
(dark grey page, offwhite text). Two other palettes were tried this session
and explicitly reverted:
1. A light/offwhite-base inversion (`bg-cream text-ink` — offwhite background,
   grey text).
2. A Paytm-style navy repalette (`ink` → `#002970` navy, background → white).

Don't reintroduce either without an explicit request — confirm which
direction is wanted before touching body background/text tokens again, since
this has flip-flopped multiple times.

**Rules:**
- Neutral text and UI (body copy, borders, navbar, footer, cards) use `cream`
  and its dim/faint/line variants — never inline `rgba(248,235,211,…)` when a
  token exists; prefer the named tokens (`cream-dim`, `cream-faint`,
  `cream-line`) over Tailwind opacity utilities for this palette, to match
  the existing pattern across components.
- Raised surfaces (cards, panels, overlays) use `ink`, `ink-soft`, or
  `ink-deep` — never `bg-white` (no "white card on dark page" pattern here).
- Brand accents (`blue`, `coral`) are reserved for: the curved-frame panels,
  CTA buttons, hover states, and small highlight marks. They are not page
  backgrounds.

## 3. The colored panels are untouchable

`Hero.tsx`, `Clients.tsx`, and `Stats.tsx` render the curved blue/coral
"frame" panels with `cream` text and `rgba(248,235,211,…)` glows. **Do not
edit their colors** when making sitewide theme changes — they are intentional
high-contrast islands and were explicitly excluded from both the light-theme
inversion and the navy repalette. If a future palette change is requested,
ask whether it includes these panels before touching them.

## 4. Positioning & copy

Mobikonnect is positioned as **India's Experiential Marketing & Customer
Engagement Technology Platform** — promise: *"We create measurable customer,
channel-partner and employee engagement experiences powered by technology."*
Tagline: **Engage. Reward. Retain. Grow.**

Do not reintroduce old "mobile marketing & advertising agency" / "We breathe
& live mobile" framing. All copy lives in [lib/content.ts](lib/content.ts) —
update there, not by hardcoding strings in components.

## 5. Reuse before inventing

Before adding a new component or pattern, check for an existing one to reuse:

- `components/ui/SectionHeader.tsx` — indexed eyebrow + masked headline, for
  homepage sections.
- `components/ui/PageHeader.tsx` — same language, for top-of-route headers
  on non-homepage pages.
- `components/ui/Cards.tsx` — `PillarCard` (numbered card + bullet points),
  `TagCloud` (pill chips), `CaseCard` (linked case-study card).
- `components/ui/Reveal.tsx` — `Reveal` (fade/rise on scroll) and
  `RevealText` (word-by-word masked headline reveal) — the standard motion
  primitives used everywhere.
- `components/ui/MagneticButton.tsx` — cursor-following CTA button.

New pages should be: `PageHeader` + composed existing patterns + a closing
`Contact` section. Don't design a new section type to solve a problem one of
the above already solves.

## 6. Case studies are database-driven — the markup must not change

`/CaseStudies` and `/CaseStudies/[slug]` now read from the `case_studies` table and are
edited in the admin portal. The **rendered markup was kept byte-identical** during that
move — verified by diffing the served HTML of the index, three detail pages and the
homepage before and after.

If you touch these pages, keep it that way:

- The card is still `CaseCard` in [components/ui/Cards.tsx](components/ui/Cards.tsx);
  its prop type is a structural subset of a DB row (`CaseCardStudy`), not the whole row.
- `challenge` / `objective` / `solution` are **plain text** rendered as `<p>{body}</p>`.
  Do not turn them into rich text — nothing on a case study touches
  `dangerouslySetInnerHTML`, and that is worth keeping.
- The hero branches on the stored `mediaKind`, not the file extension, because Vercel
  Blob appends a random suffix to uploads. Use `isVideoMedia()` from `lib/blog.ts`.
- `accent` stays a per-row `blue` / `coral` value. The seeded 20 alternate; new entries
  choose in the editor.
- The `caseStudies` array in [lib/content.ts](lib/content.ts) is **seed data only**.
  Editing it does not change the site.
- `components/sections/Work.tsx` is a client component and takes `studies` as a prop —
  it cannot import the data itself. The homepage fetches and passes the first six, which
  is why the homepage is ISR rather than fully static.

## 7. Blog surfaces reuse the case-study language

The blog (`/blog`, `/blog/[slug]`) was deliberately built from existing
patterns rather than a new visual system:

- `BlogCard` in [components/ui/Cards.tsx](components/ui/Cards.tsx) is `CaseCard`
  with the metrics row swapped for date + reading time. Same tinted panel,
  corner glow, `whileHover={{ y: -6 }}` and 45°-rotating `ArrowUpRight`.
- Post detail mirrors `app/(site)/case-studies/[slug]/page.tsx` — back-link,
  eyebrow, oversized `display` h1, `frame` hero, closing CTA.
- Long-form body copy is styled by `postBodyClass` in
  [components/blog/PostBody.tsx](components/blog/PostBody.tsx), hand-built from
  the existing tokens. **`@tailwindcss/typography` was deliberately not added** —
  it would introduce a competing type scale. Extend `postBodyClass` instead.
- Each post carries an `accent` of `blue` or `coral`, chosen in the editor, so
  the grid keeps the site's two-colour alternation.

## 8. Placeholder media is expected, not a bug

Case-study hero media, client logos, and interactive demo sections are
intentionally placeholders (gradient panels, sample metrics) until real
assets are supplied. Don't "fix" these by inventing fake-real content — flag
them as pending asset integration instead.

## 9. Admin surface — same tokens, denser scale, no motion chrome

The blog CMS at `admin.mobikonnect.com` (`app/(admin)/`) is the first
non-marketing surface in this codebase. It is a **data-entry UI**, so it follows
a deliberately different set of rules from the public site:

**Same:** every colour token (`ink` / `ink-soft` / `ink-deep` backgrounds,
`cream` text and its dim/faint/line variants, `coral` for primary actions and
active states, `blue` for informational states), Montserrat display + Karla
body, `rounded-card`, `.eyebrow` labels, `border-cream-line` hairlines. No new
colours, fonts or radii were introduced.

**Different, on purpose:**

- **No motion chrome.** The admin does not mount `SmoothScroll` (Lenis),
  `Cursor`, `Navbar` or `Footer`, and does not use `Reveal` / `RevealText`.
  Scroll-triggered reveals and a lagging custom cursor actively hurt a form-heavy
  UI. This is why `app/layout.tsx` holds only `<html>`/`<body>` and the two route
  groups — `(site)` and `(admin)` — render their own shells.
- **Denser spacing.** Cards are `p-6`, rows `py-4`, inputs `py-2.5` — roughly
  half the marketing rhythm. Do not apply `gutter` / `py-24` here.
- **Smaller type.** Headings top out at `text-3xl`; body text is `text-sm`.
  The fluid `mega`/`giant`/`huge` scale is not used.
- **`rounded-lg` on inputs**, not `rounded-pill` — pills stay for buttons and
  badges.

Reuse `components/admin/ui.tsx` (Button, SubmitButton, Field, Input, Select,
AdminCard, StatusBadge, EmptyState…) before adding a new admin primitive.

**One deliberate exception:** the editing surface in
`components/admin/RichTextEditor.tsx` imports `postBodyClass` from the public
`PostBody` component, so authors compose in the exact type styles the published
article uses. Keep those two in sync.

## 10. Authorization lives in the data layer, never in middleware

`middleware.ts` does host routing only — it maps `admin.mobikonnect.com` onto
the `/admin` tree and 404s `/admin` on the public domain. It performs **no auth
checks**, by design.

Every admin page calls `requireSession()` and every server action calls
`requireApiUser()` / `requireApiRole()` from [lib/auth.ts](lib/auth.ts). Server
Actions are addressable POST endpoints, so a guard in a parent layout does not
protect them — each action must check for itself. Do not "simplify" this by
moving the check into middleware.
