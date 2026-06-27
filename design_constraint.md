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

## 6. Placeholder media is expected, not a bug

Case-study hero media, client logos, and interactive demo sections are
intentionally placeholders (gradient panels, sample metrics) until real
assets are supplied. Don't "fix" these by inventing fake-real content — flag
them as pending asset integration instead.
