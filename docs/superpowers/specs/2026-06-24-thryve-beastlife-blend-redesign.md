# Thryve — BeastLife Blend Redesign (Performance Editorial)

**Date:** 2026-06-24 · **Status:** Design approved, ready for implementation plan · **Owner:** Periscale Projects
**Triggered by:** Client likes [beastlife.in](https://beastlife.in/) design → refactor Thryve into a blend of it (close features + story-based features).
**Previous design:** "Refined Editorial" (spec: [`2026-06-16-thryve-website-design.md`](./2026-06-16-thryve-website-design.md), log: [`PROJECT_LOG.md`](../../PROJECT_LOG.md)).

> This is the **new living design spec** for the redesign. The master project log
> ([`PROJECT_LOG.md`](../../PROJECT_LOG.md)) remains the single source of truth for all decisions and
> execution history; a new decision-row + execution entry will be appended there (§4 / §9) and this
> spec is the detailed design companion.

---

## 0. How we got here (process, for future understanding)

1. Client message: "the client likes beastlife.in's design too — refactor and make a blend of it, with
   close features but also a bit story-based features; act as a senior UI/UX + full-stack dev, deliver
   fault-proof work."
2. Explored current project state: Thryve is a **complete, QA-passed** Next.js 16 + React 19 + Tailwind v4
   site (33 routes) in a deliberate *Refined Editorial* direction. BeastLife was **already** a named
   reference in the original brief (category tiles + authenticity trust), but the team had chosen the
   calmer editorial lane.
3. Studied BeastLife's actual live homepage structure (utility nav, category icon strip, hero carousel,
   tabbed product carousels "Talk of the Town", wellness carousel, "Shop by Flavours", "Beast Stories"
   transformations, apparel carousel, promo banner, bundles carousel, "Shop By Category", flip
   testimonials, "Beastgram" UGC, footer + panther mascot).
4. Ran a structured brainstorm (one decision at a time) and locked four decisions with the client
   (see §1). This spec is the result.
5. Key senior-designer judgment: BeastLife's actual look is **discount-dense** (wall-to-wall "43% OFF"
   red badges). Cloning that would regress Thryve toward the "cheap local copy" the brief explicitly
   wants to avoid. So the blend takes BeastLife's **energy + commerce structure** but executes it
   **premium** ("Performance Editorial") via strict **badge discipline**.

---

## 1. Locked decisions (client-approved)

| # | Decision | Chosen option | Rejected alternative |
|---|---|---|---|
| R1 | **Scope** | **Full visual overhaul** across all ~33 pages | Homepage-only / stories-only |
| R2 | **Blend direction** | **Premium commerce blend** — BeastLife structure/energy, premium execution | BeastLife-bold-loud clone; editorial-structure-only |
| R3 | **Story features** | **Brand-origin narrative + Product/trust journey + Goal-based journey** | (+ Transformation stories available via existing `/stories`, folded in) |
| R4 | **Execution strategy** | **Foundation + Home first, then propagate** | Design-system-first-then-sweep; page-by-page |
| R5 | **Design personality** | **"Performance Editorial"** with **strict badge discipline** | — |
| R6 | **Mascot** | **No animal mascot** — T-mark + wordmark + Bangla pride identity | BeastLife-style panther mascot |

---

## 2. Design direction — "Performance Editorial"

### 2.1 Philosophy of the blend
- **From BeastLife we take:** commerce energy + structure (category tiles, flavour picker, product
  carousels, bundles/stacks, goal tiles, transformation strips, UGC grid, "authentic" trust framing,
  marquee energy, long rich homepage).
- **From Thryve we keep:** editorial restraint + Bangladeshi identity (green-as-punctuation, generous
  spacing, refined type, calm motion, the trust moat, bilingual EN/বাংলা).
- **The result reads bold and athletic, never discount-bin.**

### 2.2 The one rule that keeps it premium — *Badge discipline*
Discounts are shown, but the hierarchy always **leads with the product and its quality story**, not the
scream of a discount. Concretely:
- Savings shown as **small, typographic, green/amber-on-dark** (e.g. a quiet "−13%" or "Save ৳300"),
  never big red "43% OFF" plastered on every card.
- `%`/`OFF` badge is **secondary** to image + name + rating in the card hierarchy.
- Bestseller / Lab-Tested / QR-Authenticated **badges** stay tasteful (small, top-left, outlined).

### 2.3 Brand identity (no mascot)
- Keep the **T-mark + THRYVE wordmark**; make it more athletic: tighter tracking, optional motion
  "slash" accent, bold tagline system ("FUEL THE GRIND. THRYVE MORE.").
- Identity = the mark + Bangla pride + proof. **No animal mascot.**

---

## 3. Design system

### 3.1 Colour — evolve, don't replace
Backbone unchanged; **one new energy token** added.

| Token | Dark | Light | Use |
|---|---|---|---|
| `--bg` | `#0B0F13` | `#FFFFFF` | page |
| `--surface-1` | `#12161B` | `#F3F8F5` | cards |
| `--surface-2` | `#1A1F26` | `#E8F0ED` | raised/hover |
| `--line` | `#222831` | `#E0E0E0` | borders/dividers |
| `--ink` | `#F2F5F7` | `#0A0A14` | headings/prices |
| `--ink-dim` | `#9AA3AD` | `#5A5A72` | secondary text |
| `--green` | `#1D9E75` | `#1D9E75` | brand accent — **used sparingly** (CTAs, micro-accents, progress) |
| `--green-soft` | `#9FE1CB` | `#9FE1CB` | accents on dark, chips |
| `--green-deep` | `#0F6E56` | `#0F6E56` | hover, nav, section headers |
| **`--volt`** *(NEW)* | `#B6FF3C` | `#7ACC1A` | **athletic energy spark only** — hero highlights, marquee accent, key story reveals. Sparingly. |
| `--amber` | `#E8A020` | `#E8A020` | savings/upsell only |
| `--blue` | `#2F81F7` | `#2F81F7` | secondary CTA / tracking |
| `--red` | `#DA3633` | `#DA3633` | errors / strikethrough only |

> Discipline: dark canvas + ink type + green punctuation + **occasional volt spark** (never as paint).
> `--volt` must pass WCAG AA when used on text; otherwise used as a graphic accent on dark.

### 3.2 Typography
- Keep **Space Grotesk (display, 500–700)** + **Inter (body, 400/500/600)** + **Hind Siliguri (Bangla)**.
- Push display **bigger + tighter** for BeastLife-like athletic scale:
  - Display `clamp(3.5rem,9vw,7rem)`, tracking `-0.03em`.
  - H1 `clamp(2.5rem,5vw,4.25rem)`, H2 `clamp(1.75rem,3vw,2.625rem)`, H3 `1.5rem`, body `1rem/1.6`.
- Section labels: small caps / tracked uppercase Space Grotesk in `--ink-dim` or `--volt`.
- **No new font families** — preserves the `next/font` setup and performance budget.
- Bangla stack stays separate; never use Bangla font for English and vice-versa.

### 3.3 Core components — inventory
**NEW components (the BeastLife structure, premium-made):**
| Component | Purpose |
|---|---|
| `TopUtilityBar` | thin top trust/track/lang strip |
| `CategoryTileStrip` | BeastLife-style icon+label category tiles (replaces `CategoryStrip`) |
| `ProductCarousel` | horizontal snap carousel, tasteful badges, quick-add (tabs optional) |
| `FlavourPicker` | round flavour tiles |
| `BundleCard` / `StackCarousel` | first-class combos |
| `GoalJourney` | Build/Cut/Perform → stack + mini-plan (STORY) |
| `BrandStory` | scroll-reveal chapter section (STORY) |
| `TrustJourney` | Source→Lab→Jar→QR stepper (STORY) |
| `TransformationStrip` | before/after + name + city + journey cards |
| `UgcGrid` ("Thryvergram") | Instagram-style UGC grid |
| `Stepper` | generic horizontal/vertical step primitive |

**REFRESHED components** (keep logic, restyle to Performance Editorial):
`Button`, `Badge`, `Chip`, `Container`, `Stars`, `Price`, `Logo`, `Reveal`, `Marquee`,
`Hero`, `MarqueeBar`, `SocialProof`, `AthletesStrip`, `BlogPreview`, `QrVerifyCta`, `Footer`,
`Navbar`/`MegaMenu`/`MobileMenu`, `CartDrawer`, `ProductCard`, `ProductDetail`/`ProductGallery`,
`Collection`, `ShopBrowser`, `CheckoutFlow`, `Reviews`.

> `Badge` gets a **variant discipline** baked in: `bestseller | lab | qr | save` — each styled to keep
> discount badges subordinate to product quality badges.

### 3.4 Motion
- Framer Motion. Smooth snap carousels, tasteful green/volt marquee, hover micro-interactions.
- **Scroll-driven storytelling** for brand-origin chapters (reveal/parallax on scroll).
- `prefers-reduced-motion`: all non-essential motion disabled; content always visible without JS.
- Calm, not kinetic — no aggressive pin/stack/scrub.

---

## 4. Homepage architecture (the flagship — proves the whole system)

Top → bottom. `[NEW]` = brand-new component; `[REFRESH]` = restyled existing; `[STORY]` = one of the 3 story features.

1. `TopUtilityBar` `[NEW]` — "100% Authentic · Lab-Tested · Made in Bangladesh" + Track Order + lang hint.
2. `Navbar` + mega-menu `[REFRESH]`.
3. `CategoryTileStrip` `[REFRESH]` — icon+label tiles: Creatine ✓, Accessories ✓, Katana (coming), Activewear (coming), Whey 2027.
4. `Hero` `[REFRESH]` — "FUEL THE GRIND. THRYVE MORE." + product/athlete image + Shop Now / **Verify My Jar** + trust chips + volt accent.
5. `MarqueeBar` `[REFRESH]`.
6. `ProductCarousel` "Bestsellers" `[NEW]` — tabbed Bestsellers / Creatine / Bundles, quick-add, tasteful badges.
7. `GoalJourney` `[NEW · STORY]` — "What's your grind?" Build / Cut / Perform → stack + mini-plan.
8. `BrandStory` `[NEW · STORY]` — scroll-reveal chapters: Made-in-BD pride, founder/mission, why creatine.
9. `TrustJourney` `[NEW · STORY]` — Source → Lab-tested → Jar → QR verify; ends in the verify CTA.
10. `FlavourPicker` "Shop by Flavour" `[NEW]` — round tiles (Mango Ice, Watermelon Mojito, Unflavored).
11. `StackCarousel` "Bundles" `[NEW]`.
12. `TransformationStrip` "Thryver Stories" `[NEW]` — before/after + name + city + journey → `/stories`.
13. `SocialProof` `[REFRESH]` — 2,000+ · 689 areas · 4.9★.
14. `AthletesStrip` `[REFRESH]`.
15. `BlogPreview` + Science teaser "Learning" `[REFRESH]`.
16. `UgcGrid` "Thryvergram" `[NEW]`.
17. `Footer` `[REFRESH]`.

**Pacing rule:** story sections (7–9) get the most vertical breathing room; commerce sections (10–11)
stay compact. All 17 retained (BeastLife-rich).

---

## 5. Story feature specifications (the differentiators)

### 5.1 Brand-origin narrative (`BrandStory`) — STORY
- **What:** a scroll-reveal section of 3–5 "chapters" telling the Thryve story: (1) Made in Bangladesh
  pride, (2) founder/mission, (3) why creatine, (4) the local-hero ambition.
- **Mechanics:** each chapter = heading + short editorial body + image/stat, revealed on scroll
  (Framer `whileInView`); a progress rail on the side advances chapter-by-chapter.
- **Data:** new `src/data/brand-story.ts` → `chapters: { id, kicker, title, body, image, stat? }[]`.
- **Lives on:** homepage §8; the full version also seeds `/about`.

### 5.2 Product / trust journey (`TrustJourney`) — STORY
- **What:** the trust moat told as a stepper narrative instead of a spec sheet:
  **Source → Lab-tested → Jar → QR verify**. Each step: icon, one-line claim, micro-detail.
- **Mechanics:** horizontal stepper (desktop) / vertical (mobile); the final step is the interactive
  **"Verify My Jar"** input → `/verify/[serial]`.
- **Data:** new `src/data/trust-journey.ts` → `steps: { id, icon, title, detail }[]`.
- **Lives on:** homepage §9 (replaces/merges the standalone `QrVerifyCta` on home); also a block on `/science` and `/product/[slug]`.

### 5.3 Goal-based journey (`GoalJourney`) — STORY
- **What:** "What's your grind?" → pick **Build / Cut / Perform** → reveals a recommended product stack
  + a mini-plan (3–4 short steps). BeastLife-style goal tiles, but guided + editorial.
- **Mechanics:** 3 tappable goal tiles (client component, **local `useState`** — transient homepage
  interaction, no persistence needed); selecting one expands a panel showing linked products (via
  `api.ts`) + ordered plan steps. Default selection = the first goal so the panel never renders empty.
- **Data:** new `src/data/goals.ts` → `goals: { id, label, blurb, productSlugs: string[], plan: {title, detail}[] }[]`.
- **Lives on:** homepage §7.

### 5.4 Transformation stories (folded in, supports `/stories`)
- `TransformationStrip` on homepage §12 feeds a richer `/stories` hub. Formalises a transformations
  dataset (before/after, name, city, journey text). The existing `/stories` page content is the seed.
- **Data:** new `src/data/transformations.ts`.

---

## 6. Data-layer impact (still mock, still via `lib/api.ts`)
Following project decision D5 ("components never import mock data directly"), all new content goes
through `src/lib/api.ts` backed by new `src/data/*` modules:
- `brand-story.ts`, `trust-journey.ts`, `goals.ts`, `transformations.ts`, plus collections for
  **flavours** and **bundles/stacks** (derived/formalised from existing product data).
- No live back-end in this pass (unchanged from D1); the adapter swap stays a one-layer change later.

---

## 7. Propagation plan — how the system reaches all ~33 pages (phased)

Strategy R4: prove the system on Home, then propagate in phases. Each phase = a reviewable milestone
(logged in PROJECT_LOG §9). *(The detailed step-by-step plan is produced next by the writing-plans skill.)*

- **R0 — Foundation refresh.** Tokens (add `--volt`, refine) in `globals.css`; refresh core UI primitives
  to Performance Editorial; bake badge discipline into `Badge`; add the NEW shared primitives
  (`ProductCarousel`, `FlavourPicker`, `CategoryTileStrip`, `GoalJourney`, `BrandStory`, `TrustJourney`,
  `TransformationStrip`, `UgcGrid`, `Stepper`, `TopUtilityBar`); add new mock-data modules + `api.ts`
  accessors; convert remaining `<img>` → `next/image` where flagged.
- **R1 — Homepage rebuild.** Assemble the 17-section homepage with all 3 story features. System validation milestone.
- **R2 — Commerce propagation.** `/product/[slug]` (gallery carousel, trust-journey tab, refreshed
  upsell/badges), `/shop`, `/creatine`, `/accessories` (use `ProductCarousel`), `/cart` refresh, bundles surfaces.
- **R3 — Content + stories propagation.** `/stories` (transformation hub), `/about` (brand story), `/science`
  (trust journey), `/athletes`, `/blog`(+post), `/resources`, coming-soon teasers (Performance Editorial energy), `/track`, `/verify`.
- **R4 — Global chrome + purchase flow.** Nav (`TopUtilityBar` + `CategoryTileStrip`), `Footer`, `/checkout`,
  `/order/[id]`, `ExitIntent`, `WhatsAppFab` — refreshed.
- **R5 — Polish.** Motion pass; responsive audit; a11y (WCAG 2.1 AA); SEO/meta/JSON-LD; light/dark parity;
  Lighthouse 90+ mobile (LCP < 2.5s, CLS < 0.1); final QA + screenshots.

---

## 8. Scope, assumptions & non-goals (this pass)
**In scope:** full visual overhaul to Performance Editorial; the 3 story features + transformation strip;
new components + data; homepage + propagation across all routes; docs.
**Assumptions (unchanged):** still **mock data + stock/generated imagery** (no real client assets yet —
slots ready in `/public` + data layer); bilingual EN-first (Bangla on key surfaces); no live payments/back-end.
**Non-goals (this pass):** live payments, headless CMS, real client photos/certs, a literal mascot,
full Bangla marketing prose, BeastLife's exact discount-heavy badge look (rejected by R2/R5 discipline).

---

## 9. Definition of done (this redesign)
- New design system (incl. `--volt`, badge discipline) shipped and consistent across all ~33 routes.
- 17-section homepage live with all 3 story features working end-to-end on mock data.
- Every refreshed page is responsive, accessible (WCAG 2.1 AA), SEO-meta'd, light/dark supported,
  bilingual-toggle working on key surfaces.
- `npm run build` green; Lighthouse 90+ mobile; cart→checkout→confirmation still functional.
- All decisions + execution logged in `PROJECT_LOG.md` §4 (new decision rows) + §9 (dated entries), and this spec kept current.
