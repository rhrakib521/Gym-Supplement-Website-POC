# Thryve — Performance Editorial (R0 Foundation + R1 Homepage) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the "Performance Editorial" redesign foundation (design tokens + new primitives + new story data/components) and rebuild the flagship 17-section homepage so the entire new system is validated end-to-end before propagating to the other 32 pages.

**Architecture:** Evolve the existing Next.js 16 App-Router site in place. R0 adds one energy token (`--volt`), badge discipline, and a set of new shared primitives + story data/components (all through the existing `lib/api.ts` adapter — components never import mock data directly). R1 composes them into the new homepage. Existing ecommerce/content pages are untouched this pass (R2–R5).

**Tech Stack:** Next.js 16.2.9 (App Router, RSC) · React 19 · TypeScript 5 · Tailwind CSS v4 · framer-motion 12 · zustand 5 · react-i18next · lucide-react.

**Spec:** [`docs/superpowers/specs/2026-06-24-thryve-beastlife-blend-redesign.md`](../specs/2026-06-24-thryve-beastlife-blend-redesign.md) · **Log:** [`docs/PROJECT_LOG.md`](../../PROJECT_LOG.md).

## Global Constraints

- **Verification method (this project has no unit-test runner).** Every task's gate is `npm run build` exiting 0 (this also runs TypeScript type-checking and will fail on type/compile errors), plus `npm run lint` clean, plus the route/feature rendering. This matches the project's established QA method (PROJECT_LOG §9). Do **not** introduce a test framework this pass.
- **Build is the gate:** after each task run `npm run build`; it must finish with `✓ Compiled` / `✓ Generating static pages` and exit code 0. TypeScript errors fail the build — treat the compiler as the type-consistency test.
- **Data layer rule (D5):** components never import `@/data/*` directly. Add new content as `src/data/*.ts` modules + sync accessors in `src/lib/api.ts`, and components consume via `api.ts`.
- **Brand discipline (R2/R5):** "Performance Editorial" — green is punctuation, `--volt` is a *sparingly used* energy spark, discounts stay small/typographic (never big red "43% OFF"). No animal mascot.
- **i18n (D3):** EN-first. New static UI labels → add keys to `src/locales/en.json`; new editorial/story content → use typed `L = {en, bn?}` objects in data modules (matching the product/category pattern). Bangla values are optional (EN fallback).
- **Motion:** framer-motion, `prefers-reduced-motion` safe, content always visible without JS. No `new Date()` / `Math.random()` in module scope (breaks Next prerender determinism).
- **Commit per task** with a clear message. The user commits/pushes on their own cadence — local commits per task are fine and expected.

---

## File Structure (what gets created/modified this pass)

**Modified:**
- `src/app/globals.css` — add `--volt` token (theme-aware) + map to Tailwind.
- `src/types/index.ts` — add `Goal`, `StoryChapter`, `TrustStep`, `Transformation`, `UgcItem`, `FlavourTile` types; extend `Badge` with `"save"`.
- `src/lib/api.ts` — add sync accessors for the new data.
- `src/locales/en.json` — new UI label keys.
- `src/components/ui/badge.tsx` — badge discipline (quiet `sale`, add `save`) + export `DiscountChip`.
- `src/components/sections/hero.tsx` — refresh (volt accent, new tagline, badge discipline).
- `src/app/layout.tsx` — mount `TopUtilityBar`.
- `src/app/page.tsx` — compose the new 17-section homepage.

**Created:**
- `src/data/goals.ts`, `src/data/brand-story.ts`, `src/data/trust-journey.ts`, `src/data/transformations.ts`, `src/data/ugc.ts`, `src/data/flavours.ts`
- `src/components/ui/stepper.tsx`, `src/components/ui/product-carousel.tsx`, `src/components/ui/discount-chip.tsx` (or in badge.tsx)
- `src/components/layout/top-utility-bar.tsx`
- `src/components/sections/category-tile-strip.tsx`, `flavour-picker.tsx`, `stack-carousel.tsx`
- `src/components/sections/goal-journey.tsx`, `brand-story.tsx`, `trust-journey.tsx`, `transformation-strip.tsx`, `ugc-grid.tsx`, `bestseller-carousel.tsx`

> Files are split by responsibility (one component per file) matching the existing `sections/` + `ui/` convention. Each is small and independently understandable.

---

## Task 1: Add the `--volt` energy token (theme-aware) to the design system

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: a `--volt` CSS custom property (dark `#b6ff3c`, light `#5b9e10`) and a Tailwind utility namespace (`bg-volt`, `text-volt`, `border-volt`, `ring-volt`) via `@theme inline`. Later tasks use `text-volt` / `bg-volt` sparingly for energy accents.

- [ ] **Step 1: Add `--volt` to the dark theme block**

In `src/app/globals.css`, inside `:root, :root[data-theme="dark"] { … }`, add `--volt` after `--ink-dim`:

```css
:root,
:root[data-theme="dark"] {
  --bg: #0b0f13;
  --surface-1: #12161b;
  --surface-2: #1a1f26;
  --line: #222831;
  --ink: #f2f5f7;
  --ink-dim: #9aa3ad;
  --volt: #b6ff3c; /* athletic energy spark — used sparingly */
  color-scheme: dark;
}
```

- [ ] **Step 2: Add `--volt` to the light theme block**

Inside `:root[data-theme="light"] { … }`, add a darker volt for contrast on white:

```css
:root[data-theme="light"] {
  --bg: #ffffff;
  --surface-1: #f3f8f5;
  --surface-2: #e8f0ed;
  --line: #e4e7eb;
  --ink: #0a0a14;
  --ink-dim: #5a5a72;
  --volt: #5b9e10; /* darker green-lime for AA on white */
  color-scheme: light;
}
```

- [ ] **Step 3: Map `--volt` into Tailwind v4**

Inside the existing `@theme inline { … }` block, add `--color-volt` next to `--color-green`:

```css
  --color-green: var(--green);
  --color-volt: var(--volt);
```

- [ ] **Step 4: Build-check**

Run: `npm run build`
Expected: builds clean, exit 0. (`text-volt` / `bg-volt` utilities now resolve.)

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(redesign): add --volt energy token (theme-aware)"
```

---

## Task 2: Badge discipline — quiet `sale`, add `save` kind, export `DiscountChip`

**Files:**
- Modify: `src/types/index.ts` (Badge union)
- Modify: `src/components/ui/badge.tsx`

**Interfaces:**
- Produces: `Badge` kind `"save"` (small typographic "−13%" chip, amber-on-dark) and `DiscountChip` export. `sale` is restyled away from red toward amber so discount badges never scream. Consumed by `ProductCard` (already imports `Badge`) and `StackCarousel`.

- [ ] **Step 1: Extend the `Badge` union type**

In `src/types/index.ts`, change:

```ts
export type Badge = "bestseller" | "lab_tested" | "qr" | "new" | "sale";
```

to:

```ts
export type Badge = "bestseller" | "lab_tested" | "qr" | "new" | "sale" | "save";
```

- [ ] **Step 2: Restyle `sale` + add `save`, export `DiscountChip`**

Replace the entire contents of `src/components/ui/badge.tsx` with:

```tsx
import type { Badge as BadgeKind } from "@/types";
import { cn } from "@/lib/utils";

const MAP: Record<BadgeKind, { label: string; cls: string }> = {
  bestseller: { label: "Bestseller", cls: "bg-green/12 text-green ring-green/30" },
  lab_tested: { label: "Lab Tested", cls: "bg-amber/12 text-amber ring-amber/30" },
  qr: { label: "QR Authentic", cls: "bg-blue/12 text-blue ring-blue/30" },
  new: { label: "New", cls: "bg-surface-2 text-ink ring-line" },
  // Badge discipline (R2): discount badges are quiet + amber, never screaming red.
  sale: { label: "Save", cls: "bg-amber/12 text-amber ring-amber/30" },
  save: { label: "Save", cls: "bg-amber/12 text-amber ring-amber/30" },
};

export function Badge({ kind, className }: { kind: BadgeKind; className?: string }) {
  const { label, cls } = MAP[kind];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ring-1 ring-inset",
        cls,
        className,
      )}
    >
      {label}
    </span>
  );
}

/** Small, typographic discount chip — e.g. "−13%" or "Save ৳300". Keeps savings subordinate to the product. */
export function DiscountChip({
  pct,
  amount,
  className,
}: {
  pct?: number;
  amount?: number;
  className?: string;
}) {
  const label =
    pct != null
      ? `−${pct}%`
      : amount != null
        ? `Save ৳${new Intl.NumberFormat("en-US").format(amount)}`
        : "";
  if (!label) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-tight text-amber",
        className,
      )}
    >
      {label}
    </span>
  );
}
```

- [ ] **Step 3: Build-check**

Run: `npm run build`
Expected: exit 0 (no type errors; `ProductCard` still compiles — `sale`/`save` now both valid).

- [ ] **Step 4: Commit**

```bash
git add src/types/index.ts src/components/ui/badge.tsx
git commit -m "feat(redesign): badge discipline — quiet sale, add save + DiscountChip"
```

---

## Task 3: New story data modules + types + api.ts accessors

**Files:**
- Modify: `src/types/index.ts` (append new interfaces)
- Create: `src/data/goals.ts`, `src/data/brand-story.ts`, `src/data/trust-journey.ts`, `src/data/transformations.ts`, `src/data/ugc.ts`, `src/data/flavours.ts`
- Modify: `src/lib/api.ts` (add sync accessors)

**Interfaces:**
- Produces types: `Goal`, `StoryChapter`, `TrustStep`, `Transformation`, `UgcItem`, `FlavourTile`.
- Produces accessors (used by Tasks 4–13): `getGoalsSync()`, `getBrandStorySync()`, `getTrustJourneySync()`, `getTransformationsSync()`, `getUgcSync()`, `getFlavoursSync()`, `getBundlesSync()`.
- Consumes: existing `getProductBySlugSync` (for goal stacks) and the existing `Product`/`Flavour` types.

- [ ] **Step 1: Append the new interfaces to `src/types/index.ts`**

Add at the end of the file:

```ts
/** Goal-based journey ("What's your grind?") — STORY feature. */
export interface Goal {
  id: "build" | "cut" | "perform";
  label: L;
  blurb: L;
  productSlugs: string[]; // resolved via getProductBySlugSync
  plan: { title: L; detail: L }[];
}

/** Brand-origin scroll story chapter — STORY feature. */
export interface StoryChapter {
  id: string;
  kicker: L;
  title: L;
  body: L;
  image?: string;
  stat?: { value: string; label: L };
}

/** Product/trust journey step — STORY feature. */
export type TrustIcon = "source" | "lab" | "jar" | "qr";
export interface TrustStep {
  id: string;
  icon: TrustIcon;
  title: L;
  detail: L;
}

/** Customer transformation card. */
export interface Transformation {
  id: string;
  name: string;
  city: L;
  duration: L; // e.g. "12 weeks"
  quote: L;
  image: string;
}

/** UGC grid item ("Thryvergram"). */
export interface UgcItem {
  id: string;
  image: string;
  handle: string;
  caption: L;
}

/** Flavour picker tile. */
export interface FlavourTile {
  id: string;
  name: L;
  image: string;
  href: string;
}
```

- [ ] **Step 2: Create `src/data/goals.ts`**

```ts
import type { Goal } from "@/types";

export const goals: Goal[] = [
  {
    id: "build",
    label: { en: "Build", bn: "গঠন" },
    blurb: {
      en: "Add lean mass and strength. Creatine daily, train heavy, eat surplus.",
      bn: "পেশি ও শক্তি বাড়ান। প্রতিদিন ক্রিয়েটিন, ভারী ট্রেনিং।",
    },
    productSlugs: ["creatine-monohydrate", "creatine-starter-stack", "thryve-shaker"],
    plan: [
      { title: { en: "Daily 5g creatine" }, detail: { en: "One scoop, any time. Consistency beats timing." } },
      { title: { en: "Train 4–5×/week" }, detail: { en: "Compound lifts, progressive overload." } },
      { title: { en: "Eat in a surplus" }, detail: { en: "~300–500 kcal above maintenance." } },
    ],
  },
  {
    id: "cut",
    label: { en: "Cut", bn: "কাট" },
    blurb: {
      en: "Hold muscle while losing fat. Creatine preserves strength in a deficit.",
      bn: "ফ্যাট কমান, পেশি ধরে রাখুন।",
    },
    productSlugs: ["creatine-monohydrate", "thryve-wrist-wraps", "thryve-shaker"],
    plan: [
      { title: { en: "Stay on creatine" }, detail: { en: "Keeps output high while calories drop." } },
      { title: { en: "Keep protein high" }, detail: { en: "~2g/kg to spare muscle." } },
      { title: { en: "Small deficit" }, detail: { en: "~300–500 kcal under maintenance." } },
    ],
  },
  {
    id: "perform",
    label: { en: "Perform", bn: "পারফর্ম" },
    blurb: {
      en: "Power, output, recovery. Gear up and dose for explosive work.",
      bn: "পাওয়ার ও রিকভারির জন্য গিয়ার।",
    },
    productSlugs: ["creatine-monohydrate", "thryve-lifting-belt", "thryve-wrist-wraps"],
    plan: [
      { title: { en: "Creatine pre-heavy days" }, detail: { en: "Saturate for peak power output." } },
      { title: { en: "Use a belt on maxes" }, detail: { en: "Bracing > raw for top sets." } },
      { title: { en: "Wrap for pressing" }, detail: { en: "Lock the wrists under load." } },
    ],
  },
];
```

- [ ] **Step 3: Create `src/data/brand-story.ts`**

```ts
import type { StoryChapter } from "@/types";

const JAR =
  "https://res.cloudinary.com/ddope55xr/image/upload/v1751739019/WEB_1_by9uon.webp";

export const brandStory: StoryChapter[] = [
  {
    id: "made-in-bd",
    kicker: { en: "Chapter 01" },
    title: { en: "Made in Bangladesh.", bn: "বাংলাদেশে তৈরি।" },
    body: {
      en: "Thryve was born to prove a world-class supplement can be made at home — lab-tested, honestly dosed, sealed with a QR — not imported and marked up.",
      bn: "থ্রাইভ প্রমাণ করতে এসেছে যে বিশ্বমানের সাপ্লিমেন্ট দেশেই তৈরি হতে পারে।",
    },
    image: JAR,
    stat: { value: "100%", label: { en: "Made in Bangladesh" } },
  },
  {
    id: "mission",
    kicker: { en: "Chapter 02" },
    title: { en: "Built for the ones who refuse average.", bn: "মাঝারি মানে না, তাদের জন্য।" },
    body: {
      en: "We started Thryve for the Bangladeshi athlete who trains hard and deserves clean, effective fuel — not hype, not fillers, not mystery blends.",
    },
    stat: { value: "5g", label: { en: "creatine per serving — no fillers" } },
  },
  {
    id: "why-creatine",
    kicker: { en: "Chapter 03" },
    title: { en: "Why creatine first." },
    body: {
      en: "It is the most researched supplement on earth — 500+ studies back it for strength, power, and lean mass. The honest place to start. So we started there.",
    },
    stat: { value: "500+", label: { en: "studies behind creatine" } },
  },
  {
    id: "ambition",
    kicker: { en: "Chapter 04" },
    title: { en: "The local hero, going further." },
    body: {
      en: "Creatine today. Pre-Workout (Katana), Activewear, and Whey tomorrow. The ambition is a full Bangladeshi performance brand — built to sit beside the best in the world.",
    },
  },
];
```

- [ ] **Step 4: Create `src/data/trust-journey.ts`**

```ts
import type { TrustStep } from "@/types";

export const trustJourney: TrustStep[] = [
  {
    id: "source",
    icon: "source",
    title: { en: "Source" },
    detail: { en: "Raw creatine monohydrate, micronized for clean mixing." },
  },
  {
    id: "lab",
    icon: "lab",
    title: { en: "Lab-tested" },
    detail: { en: "Every batch third-party tested for purity and dose." },
  },
  {
    id: "jar",
    icon: "jar",
    title: { en: "Sealed in the jar" },
    detail: { en: "Sealed fresh with a unique QR serial on every jar." },
  },
  {
    id: "qr",
    icon: "qr",
    title: { en: "Verify by QR" },
    detail: { en: "Scan or enter your serial — know yours is real in seconds." },
  },
];
```

- [ ] **Step 5: Create `src/data/transformations.ts`**

```ts
import type { Transformation } from "@/types";

export const transformations: Transformation[] = [
  {
    id: "t-1",
    name: "Rifat",
    city: { en: "Dhaka", bn: "ঢাকা" },
    duration: { en: "12 weeks" },
    quote: {
      en: "Consistency + 5g a day. First time my lifts actually moved.",
      bn: "নিয়মিত + দিনে ৫g। প্রথমবার লিফট এগোলো।",
    },
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "t-2",
    name: "Sumaiya",
    city: { en: "Chattogram", bn: "চট্টগ্রাম" },
    duration: { en: "16 weeks" },
    quote: {
      en: "Held my strength through a cut. The QR thing made me trust it.",
      bn: "কাটে শক্তি ধরে রেখেছি। QR-এ ভরসা হলো।",
    },
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "t-3",
    name: "Tanvir",
    city: { en: "Sylhet", bn: "সিলেট" },
    duration: { en: "8 weeks" },
    quote: {
      en: "Mango Ice mixes clean. No weird aftertaste, no fillers.",
      bn: "ম্যাঙ্গো আইস দারুণ মিক্স হয়।",
    },
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
  },
];
```

- [ ] **Step 6: Create `src/data/ugc.ts`**

```ts
import type { UgcItem } from "@/types";

const IMG = "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=700&q=80";

export const ugc: UgcItem[] = [
  { id: "u-1", image: IMG, handle: "@rifat.lifts", caption: { en: "Shoulders day. #ThryveMode" } },
  { id: "u-2", image: IMG, handle: "@sumaiya.fit", caption: { en: "Cutting, still strong." } },
  { id: "u-3", image: IMG, handle: "@tanvir presses", caption: { en: "Mango Ice hit different." } },
  { id: "u-4", image: IMG, handle: "@dhaka.barbell", caption: { en: "Made in BD. Proud." } },
  { id: "u-5", image: IMG, handle: "@nusrat.trains", caption: { en: "5g a day, every day." } },
  { id: "u-6", image: IMG, handle: "@ctg.iron", caption: { en: "Verified my jar ✅" } },
];
```

- [ ] **Step 7: Create `src/data/flavours.ts`**

```ts
import type { FlavourTile } from "@/types";

export const flavourTiles: FlavourTile[] = [
  {
    id: "mango-ice",
    name: { en: "Mango Ice", bn: "ম্যাঙ্গো আইস" },
    image:
      "https://res.cloudinary.com/ddope55xr/image/upload/v1751739019/WEB_1_by9uon.webp",
    href: "/creatine",
  },
  {
    id: "watermelon-mojito",
    name: { en: "Watermelon Mojito", bn: "ওয়াটারমেলন মোহিতো" },
    image:
      "https://res.cloudinary.com/ddope55xr/image/upload/v1751739170/Product_Featured_qb5ksx.webp",
    href: "/creatine",
  },
  {
    id: "unflavored",
    name: { en: "Unflavored", bn: "আনফ্লেভার্ড" },
    image: "/product-placeholder.svg",
    href: "/creatine",
  },
];
```

- [ ] **Step 8: Add sync accessors to `src/lib/api.ts`**

Add these imports near the top (with the existing `@/data/*` imports):

```ts
import { goals as goalsData } from "@/data/goals";
import { brandStory as brandStoryData } from "@/data/brand-story";
import { trustJourney as trustJourneyData } from "@/data/trust-journey";
import { transformations as transformationsData } from "@/data/transformations";
import { ugc as ugcData } from "@/data/ugc";
import { flavourTiles as flavourTilesData } from "@/data/flavours";
```

Add the matching type imports to the existing `import type { … } from "@/types";` line — append: `Goal, StoryChapter, TrustStep, Transformation, UgcItem, FlavourTile`.

Then append a new section at the end of the file (before nothing — just at the bottom):

```ts
/* ---------- Story / commerce content (redesign R0) ---------- */

export function getGoalsSync(): Goal[] {
  return goalsData;
}
export function getBrandStorySync(): StoryChapter[] {
  return brandStoryData;
}
export function getTrustJourneySync(): TrustStep[] {
  return trustJourneyData;
}
export function getTransformationsSync(): Transformation[] {
  return transformationsData;
}
export function getUgcSync(): UgcItem[] {
  return ugcData;
}
export function getFlavoursSync(): FlavourTile[] {
  return flavourTilesData;
}
export function getBundlesSync(): Product[] {
  return productsData.filter((p) => p.bundle || p.bestseller);
}
export function getProductsBySlugsSync(slugs: string[]): Product[] {
  return slugs
    .map((s) => productsData.find((p) => p.slug === s))
    .filter(Boolean) as Product[];
}
```

- [ ] **Step 9: Build-check**

Run: `npm run build`
Expected: exit 0. All new types/modules/accessors compile.

- [ ] **Step 10: Commit**

```bash
git add src/types/index.ts src/data/goals.ts src/data/brand-story.ts src/data/trust-journey.ts src/data/transformations.ts src/data/ugc.ts src/data/flavours.ts src/lib/api.ts
git commit -m "feat(redesign): add story data modules + types + api accessors"
```

---

## Task 4: `Stepper` primitive

**Files:**
- Create: `src/components/ui/stepper.tsx`

**Interfaces:**
- Produces: `Stepper({ steps: { id, icon, title: L, detail: L }[]; lang })` — a horizontal (desktop) / vertical (mobile) step rail. Consumed by `TrustJourney` (Task 11).

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { Sprout, FlaskConical, Package, QrCode } from "lucide-react";
import { tx } from "@/lib/format";
import type { Lang, TrustIcon } from "@/types";

const ICONS: Record<TrustIcon, React.ComponentType<{ className?: string }>> = {
  source: Sprout,
  lab: FlaskConical,
  jar: Package,
  qr: QrCode,
};

export function Stepper({
  steps,
  lang,
}: {
  steps: { id: string; icon: TrustIcon; title: { en: string; bn?: string }; detail: { en: string; bn?: string } }[];
  lang: Lang;
}) {
  return (
    <ol className="grid gap-6 md:grid-cols-4">
      {steps.map((s, i) => {
        const Icon = ICONS[s.icon];
        return (
          <li key={s.id} className="relative">
            <div className="flex items-center gap-3 md:block">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface-1 text-green">
                <Icon className="h-5 w-5" />
              </span>
              {i < steps.length - 1 ? (
                <span
                  aria-hidden
                  className="hidden h-px flex-1 bg-line md:absolute md:left-11 md:top-[22px] md:block md:w-[calc(100%-3rem)]"
                />
              ) : null}
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-volt">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold text-ink">
              {tx(s.title, lang)}
            </h3>
            <p className="mt-1 text-sm text-ink-dim">{tx(s.detail, lang)}</p>
          </li>
        );
      })}
    </ol>
  );
}
```

- [ ] **Step 2: Build-check** — Run: `npm run build` → expect exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/stepper.tsx
git commit -m "feat(redesign): add Stepper primitive"
```

---

## Task 5: `ProductCarousel` primitive (with optional tabs)

**Files:**
- Create: `src/components/ui/product-carousel.tsx`

**Interfaces:**
- Produces: `ProductCarousel({ products })` (simple) **and** `ProductCarousel({ tabs: {id,label,products}[], defaultTabId })` (tabbed). Horizontal scroll-snap with prev/next + keyboard. Consumes `ProductCard`. Used by `BestsellerCarousel` (Task 15) and `StackCarousel` (Task 13).

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

function Track({ products }: { products: Product[] }) {
  return (
    <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {products.map((p) => (
        <div
          key={p.id}
          className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%] xl:w-[23%]"
        >
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}

export function ProductCarousel({
  products,
  tabs,
  defaultTabId,
}: {
  products?: Product[];
  tabs?: { id: string; label: string; products: Product[] }[];
  defaultTabId?: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(defaultTabId ?? tabs?.[0]?.id);

  const scrollBy = (dir: -1 | 1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 560), behavior: "smooth" });
  };

  const shown = tabs?.find((t) => t.id === active)?.products ?? products ?? [];

  return (
    <div>
      {tabs && tabs.length > 1 ? (
        <div className="mb-5 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                t.id === active
                  ? "border-green bg-green text-black"
                  : "border-line text-ink-dim hover:text-ink",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="relative">
        <div ref={scroller}>
          <Track products={shown} />
        </div>

        <button
          type="button"
          aria-label="Previous"
          onClick={() => scrollBy(-1)}
          className="absolute -left-3 top-[28%] hidden h-10 w-10 items-center justify-center rounded-full border border-line bg-bg/90 text-ink backdrop-blur hover:border-green hover:text-green md:inline-flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => scrollBy(1)}
          className="absolute -right-3 top-[28%] hidden h-10 w-10 items-center justify-center rounded-full border border-line bg-bg/90 text-ink backdrop-blur hover:border-green hover:text-green md:inline-flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build-check** — Run: `npm run build` → expect exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/product-carousel.tsx
git commit -m "feat(redesign): add ProductCarousel primitive (tabs optional)"
```

---

## Task 6: `FlavourPicker` section

**Files:**
- Create: `src/components/sections/flavour-picker.tsx`

**Interfaces:**
- Consumes: `getFlavoursSync()` from `@/lib/api`, `useLang`, `SectionHeading`.

- [ ] **Step 1: Create the component**

```tsx
"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "./section-heading";
import { getFlavoursSync } from "@/lib/api";
import { tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";

export function FlavourPicker() {
  const { t } = useTranslation();
  const lang = useLang();
  const flavours = getFlavoursSync();

  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeading eyebrow="Taste" title="Shop by flavour" />
        <div className="mt-10 flex flex-wrap justify-center gap-6 md:gap-10">
          {flavours.map((f) => (
            <Link
              key={f.id}
              href={f.href}
              className="group flex flex-col items-center gap-3"
            >
              <span className="relative h-28 w-28 overflow-hidden rounded-full border border-line bg-surface-1 transition group-hover:border-green md:h-32 md:w-32">
                <img
                  src={f.image}
                  alt={tx(f.name, lang)}
                  loading="lazy"
                  className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              <span className="text-sm font-medium text-ink group-hover:text-green">
                {tx(f.name, lang)}
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-ink-dim">
          {t("flavours.hint", { defaultValue: "Mixes clean. No fillers, no aftertaste." })}
        </p>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Build-check** — Run: `npm run build` → expect exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/flavour-picker.tsx
git commit -m "feat(redesign): add FlavourPicker section"
```

---

## Task 7: `CategoryTileStrip` section (BeastLife-style icon tiles)

**Files:**
- Create: `src/components/sections/category-tile-strip.tsx`

**Interfaces:**
- Consumes: `getCategoriesSync()`, `useLang`, `SectionHeading`. Replaces the big `CategoryStrip` on the homepage (kept elsewhere).

- [ ] **Step 1: Create the component**

```tsx
"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "./section-heading";
import { getCategoriesSync } from "@/lib/api";
import { tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";

export function CategoryTileStrip() {
  const { t } = useTranslation();
  const lang = useLang();
  const cats = getCategoriesSync();

  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading
          eyebrow="The range"
          title="Shop by category"
          action={{ href: "/shop", label: t("common.viewAll") }}
        />
        <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-5">
          {cats.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface-1 p-4 text-center transition hover:border-green"
            >
              <span className="relative h-16 w-16 overflow-hidden rounded-full border border-line bg-bg">
                <img
                  src={cat.image}
                  alt={tx(cat.name, lang)}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-85 transition group-hover:scale-105 group-hover:opacity-100"
                />
              </span>
              <span className="text-xs font-medium leading-tight text-ink group-hover:text-green md:text-sm">
                {tx(cat.name, lang)}
              </span>
              {cat.status !== "live" ? (
                <span className="rounded-full bg-amber/12 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-amber">
                  {tx(cat.badge, lang)}
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Build-check** — Run: `npm run build` → expect exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/category-tile-strip.tsx
git commit -m "feat(redesign): add CategoryTileStrip (icon tiles)"
```

---

## Task 8: `TopUtilityBar` + wire into layout

**Files:**
- Create: `src/components/layout/top-utility-bar.tsx`
- Modify: `src/app/layout.tsx` (mount it above the navbar)

**Interfaces:**
- Produces: a thin global trust/track/lang strip rendered at the very top of every page.

- [ ] **Step 1: Create the component**

```tsx
"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";
import { getCategoriesSync } from "@/lib/api";

export function TopUtilityBar() {
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <div className="border-b border-line bg-surface-1">
      <div className="container-page flex h-9 items-center justify-between text-[11px] text-ink-dim">
        <p className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-green" />
          <span className="hidden sm:inline">{t("topbar.trust", { defaultValue: "100% Authentic · Lab-Tested · Made in Bangladesh" })}</span>
          <span className="sm:hidden">{t("topbar.trustShort", { defaultValue: "100% Authentic" })}</span>
        </p>
        <div className="flex items-center gap-4">
          <Link href="/track" className="hover:text-ink">{t("nav.trackOrder")}</Link>
          <Link href="/science" className="hidden hover:text-ink sm:inline">{t("nav.science")}</Link>
          <Link href="/creatine" className="hover:text-green">
            {tx(getCategoriesSync()[0]?.name, lang) || "Creatine"}
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire it into the layout**

In `src/app/layout.tsx`, import it:

```tsx
import { TopUtilityBar } from "@/components/layout/top-utility-bar";
```

Then render it as the **first** child inside the page body wrapper, immediately above the existing `<Navbar />` (keep Navbar where it is). If the body is structured as e.g. `<><Navbar/><main>{children}</main><Footer/></>`, change to:

```tsx
<>
  <TopUtilityBar />
  <Navbar />
  <main>{children}</main>
  {/* …footer, drawers, etc. unchanged… */}
</>
```

(Open `layout.tsx`, find the `<Navbar />` mount, and place `<TopUtilityBar />` directly above it. Do not move any other chrome.)

- [ ] **Step 3: Build-check** — Run: `npm run build` → expect exit 0. Then `npm run lint` → clean.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/top-utility-bar.tsx src/app/layout.tsx
git commit -m "feat(redesign): add TopUtilityBar global strip"
```

---

## Task 9: `GoalJourney` (story feature)

**Files:**
- Create: `src/components/sections/goal-journey.tsx`

**Interfaces:**
- Consumes: `getGoalsSync()`, `getProductsBySlugsSync()` from `@/lib/api`, `useLang`, `ProductCard`, `Reveal`.
- Local `useState` selects the active goal (default = first goal so the panel never renders empty).

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/product/product-card";
import { getGoalsSync, getProductsBySlugsSync } from "@/lib/api";
import { tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";

export function GoalJourney() {
  const { t } = useTranslation();
  const lang = useLang();
  const goals = getGoalsSync();
  const [activeId, setActiveId] = useState(goals[0]?.id ?? "build");
  const active = goals.find((g) => g.id === activeId) ?? goals[0];
  const stack = active ? getProductsBySlugsSync(active.productSlugs) : [];

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="Start here" title="What's your grind?" />

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {goals.map((g) => {
            const on = g.id === activeId;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setActiveId(g.id)}
                className={
                  "rounded-2xl border p-5 text-left transition " +
                  (on
                    ? "border-green bg-surface-1"
                    : "border-line bg-surface-1/40 hover:border-ink-dim")
                }
              >
                <span className="font-display text-xl font-semibold text-ink">
                  {tx(g.label, lang)}
                </span>
                <p className="mt-1 text-sm text-ink-dim">{tx(g.blurb, lang)}</p>
              </button>
            );
          })}
        </div>

        {active ? (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-volt">
                {t("goalPlan.eyebrow", { defaultValue: "Your mini-plan" })}
              </p>
              <ol className="mt-4 space-y-4">
                {active.plan.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-xs font-semibold text-green">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-ink">{tx(step.title, lang)}</p>
                      <p className="text-sm text-ink-dim">{tx(step.detail, lang)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <Reveal>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-dim">
                {t("goalPlan.stack", { defaultValue: "Recommended stack" })}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stack.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </Reveal>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Build-check** — Run: `npm run build` → expect exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/goal-journey.tsx
git commit -m "feat(redesign): add GoalJourney story section"
```

---

## Task 10: `BrandStory` (story feature, scroll-reveal)

**Files:**
- Create: `src/components/sections/brand-story.tsx`

**Interfaces:**
- Consumes: `getBrandStorySync()`, `useLang`, `Reveal`.

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getBrandStorySync } from "@/lib/api";
import { tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";

export function BrandStory() {
  const { t } = useTranslation();
  const lang = useLang();
  const chapters = getBrandStorySync();

  return (
    <section className="relative py-24 md:py-36">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-volt">
          {t("brandStory.eyebrow", { defaultValue: "The Thryve story" })}
        </p>
        <div className="mt-10 space-y-20 md:space-y-28">
          {chapters.map((c, i) => (
            <Reveal key={c.id}>
              <div
                className={
                  "grid items-center gap-8 md:gap-14 " +
                  (i % 2 === 1 ? "md:grid-cols-[1fr_0.9fr]" : "md:grid-cols-[0.9fr_1fr]")
                }
              >
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green">
                    {tx(c.kicker, lang)}
                  </p>
                  <h3 className="mt-2 text-balance font-display text-3xl font-semibold leading-tight md:text-[2.75rem]">
                    {tx(c.title, lang)}
                  </h3>
                  <p className="mt-4 max-w-md text-ink-dim">{tx(c.body, lang)}</p>
                  {c.stat ? (
                    <div className="mt-6">
                      <p className="font-display text-4xl font-bold text-volt">{c.stat.value}</p>
                      <p className="text-sm text-ink-dim">{tx(c.stat.label, lang)}</p>
                    </div>
                  ) : null}
                </div>
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  {c.image ? (
                    <div className="noise relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-surface-1">
                      <img
                        src={c.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-contain p-6"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] rounded-3xl border border-line bg-surface-1" />
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Build-check** — Run: `npm run build` → expect exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/brand-story.tsx
git commit -m "feat(redesign): add BrandStory scroll-reveal section"
```

---

## Task 11: `TrustJourney` (story feature + QR verify CTA)

**Files:**
- Create: `src/components/sections/trust-journey.tsx`

**Interfaces:**
- Consumes: `getTrustJourneySync()`, `useLang`, `Stepper`. Reuses the QR-serial input behavior from the existing `QrVerifyCta` (router push to `/verify/[serial]`). On the homepage this **replaces** `QrVerifyCta`.

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "./section-heading";
import { Stepper } from "@/components/ui/stepper";
import { getTrustJourneySync } from "@/lib/api";
import { useLang } from "@/lib/use-lang";

export function TrustJourney() {
  const lang = useLang();
  const router = useRouter();
  const [serial, setSerial] = useState("");
  const steps = getTrustJourneySync();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const s = serial.trim().toUpperCase();
    router.push(s ? `/verify/${encodeURIComponent(s)}` : "/verify");
  };

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="noise relative overflow-hidden rounded-3xl border border-line bg-surface-1 p-8 md:p-14">
          <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-volt/10 blur-3xl" />
          <SectionHeading eyebrow="The trust moat" title="Source → Lab → Jar → QR" />

          <div className="mt-10">
            <Stepper steps={steps} lang={lang} />
          </div>

          <form
            onSubmit={submit}
            className="mt-12 flex w-full max-w-md items-center gap-2"
          >
            <input
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              placeholder="THRYVE-LN204-0001"
              aria-label="QR serial"
              className="h-12 w-full rounded-[10px] border border-line bg-bg px-3 text-sm outline-none placeholder:text-ink-dim focus:border-green"
            />
            <button
              type="submit"
              className="inline-flex h-12 shrink-0 items-center gap-2 rounded-[10px] bg-green px-5 font-medium text-black transition-colors hover:bg-green-deep hover:text-white"
            >
              Verify <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Build-check** — Run: `npm run build` → expect exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/trust-journey.tsx
git commit -m "feat(redesign): add TrustJourney story section (replaces QrVerifyCta on home)"
```

---

## Task 12: `TransformationStrip` (story feature)

**Files:**
- Create: `src/components/sections/transformation-strip.tsx`

**Interfaces:**
- Consumes: `getTransformationsSync()`, `useLang`, `SectionHeading`.

- [ ] **Step 1: Create the component**

```tsx
"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "./section-heading";
import { getTransformationsSync } from "@/lib/api";
import { tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";

export function TransformationStrip() {
  const { t } = useTranslation();
  const lang = useLang();
  const items = getTransformationsSync();

  return (
    <section className="py-20 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Thryver Stories"
          title="Real grind. Real results."
          action={{ href: "/stories", label: t("common.viewAll") }}
        />
        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((it) => (
            <article
              key={it.id}
              className="w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-[31%]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface-1">
                <img
                  src={it.image}
                  alt={it.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-lg font-semibold text-ink">{it.name}</p>
                  <p className="text-xs text-ink-dim">
                    {tx(it.city, lang)} · {tx(it.duration, lang)}
                  </p>
                  <p className="mt-2 text-sm text-ink/90">“{tx(it.quote, lang)}”</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <Link
          href="/stories"
          className="mt-2 inline-block text-sm font-medium text-green hover:underline"
        >
          {t("common.viewAll")} →
        </Link>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Build-check** — Run: `npm run build` → expect exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/transformation-strip.tsx
git commit -m "feat(redesign): add TransformationStrip story section"
```

---

## Task 13: `UgcGrid` ("Thryvergram") + `StackCarousel`

**Files:**
- Create: `src/components/sections/ugc-grid.tsx`
- Create: `src/components/sections/stack-carousel.tsx`

**Interfaces:**
- `UgcGrid` consumes `getUgcSync()`.
- `StackCarousel` consumes `getBundlesSync()` + `ProductCarousel` + `SectionHeading`.

- [ ] **Step 1: Create `ugc-grid.tsx`**

```tsx
"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "./section-heading";
import { getUgcSync } from "@/lib/api";
import { tx } from "@/lib/format";
import { useLang } from "@/lib/use-lang";

export function UgcGrid() {
  const lang = useLang();
  const items = getUgcSync();

  return (
    <section className="py-20 md:py-24">
      <Container>
        <SectionHeading eyebrow="Thryvergram" title="#ThryveMode" />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((it) => (
            <a
              key={it.id}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group relative aspect-square overflow-hidden rounded-xl border border-line bg-surface-1"
              aria-label={it.handle}
            >
              <img
                src={it.image}
                alt={tx(it.caption, lang)}
                loading="lazy"
                className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 to-transparent p-2 text-[10px] font-medium text-ink/90">
                {it.handle}
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Create `stack-carousel.tsx`**

```tsx
"use client";

import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "./section-heading";
import { ProductCarousel } from "@/components/ui/product-carousel";
import { getBundlesSync } from "@/lib/api";

export function StackCarousel() {
  const { t } = useTranslation();
  const bundles = getBundlesSync();

  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeading
          eyebrow="Stack up"
          title="Bundles & stacks"
          action={{ href: "/shop", label: t("common.viewAll") }}
        />
        <div className="mt-10">
          <ProductCarousel products={bundles} />
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Build-check** — Run: `npm run build` → expect exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/ugc-grid.tsx src/components/sections/stack-carousel.tsx
git commit -m "feat(redesign): add UgcGrid + StackCarousel sections"
```

---

## Task 14: Refresh `Hero` (volt accent + new tagline + badge discipline)

**Files:**
- Modify: `src/components/sections/hero.tsx`
- Modify: `src/locales/en.json` (hero copy)

**Interfaces:**
- Consumes/produces: same `Hero()` export; only copy + accent classes change so the homepage (Task 15) keeps importing `<Hero />`.

- [ ] **Step 1: Update hero copy in `src/locales/en.json`**

Replace the existing `"hero": { … }` block with:

```json
  "hero": {
    "eyebrow": "Made in Bangladesh · Lab-tested",
    "title1": "Fuel the grind.",
    "title2": "Thryve more.",
    "subtitle": "Research-backed creatine monohydrate — pure, dosed right, and QR-verified. Built for Bangladeshi athletes who refuse average.",
    "ctaShop": "Shop Creatine",
    "ctaVerify": "Verify My Jar"
  },
```

- [ ] **Step 2: Apply volt accent + athletic scale in `hero.tsx`**

In `src/components/sections/hero.tsx`:

(a) Add the volt glow: in the absolute background layer, change the single green blur to a layered glow by replacing the `pointer-events-none absolute inset-0 -z-10` div's child with:

```tsx
        <div className="absolute left-1/2 top-[-12%] h-[440px] w-[860px] max-w-[120vw] -translate-x-1/2 rounded-full bg-green/10 blur-[130px]" />
        <div className="absolute right-[5%] top-[10%] h-72 w-72 rounded-full bg-volt/10 blur-[120px]" />
```

(b) Tighten + enlarge the H1 for athletic scale. Change the `motion.h1` className from:

```
text-balance text-[clamp(2.75rem,8vw,6rem)] font-semibold leading-[0.92]
```

to:

```
text-balance text-[clamp(3rem,9vw,7rem)] font-bold leading-[0.9] tracking-[-0.03em]
```

(c) Give the second line a volt underline accent. Replace:

```tsx
            <span className="text-green">{t("hero.title2")}</span>
```

with:

```tsx
            <span className="text-green">
              {t("hero.title2")}
              <span className="mt-1 block h-1 w-16 rounded-full bg-volt" />
            </span>
```

Leave all other hero markup (chips, CTAs, image, floating cards) unchanged.

- [ ] **Step 3: Build-check** — Run: `npm run build` → expect exit 0. Then visually confirm the homepage hero shows the volt accent (Task 15 makes it visible).

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/hero.tsx src/locales/en.json
git commit -m "feat(redesign): refresh Hero — volt accent, athletic scale, new tagline"
```

---

## Task 15: Assemble the new 17-section homepage + Bestseller carousel

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/sections/bestseller-carousel.tsx`

**Interfaces:**
- Composes the components built in Tasks 4–14. Existing `MarqueeBar`, `SocialProof`, `AthletesStrip`, `BlogPreview` are reused as-is (refreshed in R5). `QrVerifyCta` is **removed** from the homepage (replaced by `TrustJourney`).

- [ ] **Step 1: Create `bestseller-carousel.tsx`** (tabbed: Bestsellers / Creatine / Bundles)

```tsx
"use client";

import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "./section-heading";
import { ProductCarousel } from "@/components/ui/product-carousel";
import { getProductsSync, getBundlesSync } from "@/lib/api";
import type { Product } from "@/types";

export function BestsellerCarousel() {
  const { t } = useTranslation();
  const all = getProductsSync();
  const creatine = all.filter((p) => p.category === "creatine");
  const best = all.filter((p) => p.bestseller);
  const bundles = getBundlesSync();

  const tabs = [
    { id: "best", label: "Bestsellers", products: (best.length ? best : all) as Product[] },
    { id: "creatine", label: "Creatine", products: creatine },
    { id: "bundles", label: "Bundles", products: bundles },
  ];

  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeading
          eyebrow="Most wanted"
          title="Talk of the town"
          action={{ href: "/shop", label: t("common.viewAll") }}
        />
        <div className="mt-8">
          <ProductCarousel tabs={tabs} defaultTabId="best" />
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Replace `src/app/page.tsx` with the new composition**

```tsx
import { Hero } from "@/components/sections/hero";
import { MarqueeBar } from "@/components/sections/marquee-bar";
import { CategoryTileStrip } from "@/components/sections/category-tile-strip";
import { BestsellerCarousel } from "@/components/sections/bestseller-carousel";
import { GoalJourney } from "@/components/sections/goal-journey";
import { BrandStory } from "@/components/sections/brand-story";
import { TrustJourney } from "@/components/sections/trust-journey";
import { FlavourPicker } from "@/components/sections/flavour-picker";
import { StackCarousel } from "@/components/sections/stack-carousel";
import { TransformationStrip } from "@/components/sections/transformation-strip";
import { SocialProof } from "@/components/sections/social-proof";
import { AthletesStrip } from "@/components/sections/athletes-strip";
import { BlogPreview } from "@/components/sections/blog-preview";
import { UgcGrid } from "@/components/sections/ugc-grid";

export default function Home() {
  return (
    <>
      {/* 3 */}<CategoryTileStrip />
      {/* 4 */}<Hero />
      {/* 5 */}<MarqueeBar />
      {/* 6 */}<BestsellerCarousel />
      {/* 7 — STORY */}<GoalJourney />
      {/* 8 — STORY */}<BrandStory />
      {/* 9 — STORY */}<TrustJourney />
      {/* 10 */}<FlavourPicker />
      {/* 11 */}<StackCarousel />
      {/* 12 */}<TransformationStrip />
      {/* 13 */}<SocialProof />
      {/* 14 */}<AthletesStrip />
      {/* 15 */}<BlogPreview />
      {/* 16 */}<UgcGrid />
    </>
  );
}
```

> `TopUtilityBar` (§1) and `Navbar`/`Footer` (§2, §17) are global chrome rendered by `layout.tsx` (Task 8 + existing). `QrVerifyCta` is no longer imported on the homepage — its job is now done by `TrustJourney`. Do not delete `qr-verify-cta.tsx` (it may still be referenced elsewhere; R3 will reconcile).

- [ ] **Step 3: Build-check**

Run: `npm run build`
Expected: exit 0; `/` prerenders successfully.

- [ ] **Step 4: Render check**

Run: `npm run dev` (background), then open `http://localhost:3000/` and confirm all 14 content sections render in order with no console errors; toggle the language (EN/বাংলা) and confirm copy switches on the story sections. Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/components/sections/bestseller-carousel.tsx
git commit -m "feat(redesign): assemble 17-section Performance Editorial homepage (R1)"
```

---

## Self-Review (done during planning)

**Spec coverage:** §3.1 colour `--volt` → Task 1. §3.3 components: `ProductCarousel`→T5, `FlavourPicker`→T6, `CategoryTileStrip`→T7, `TopUtilityBar`→T8, `GoalJourney`→T9, `BrandStory`→T10, `TrustJourney`→T11, `TransformationStrip`→T12, `UgcGrid`/`StackCarousel`→T13, `Stepper`→T4, badge discipline→T2. §3.2 athletic type scale + volt accent → T1/T14. §4 homepage sections 1–17 → T15 (+T8 global). §5 story features (brand-origin→T10, trust-journey→T11, goal-based→T9, transformation→T12). §6 data layer (all via api.ts) → T3. No spec section for R0+R1 is unaddressed; R2–R5 are explicitly deferred to follow-on plans.

**Placeholder scan:** none. Every step has complete code or an exact edit. `t("…", { defaultValue })` is i18next's real API (renders the default if the key is absent — not a TODO).

**Type consistency:** `Goal`, `StoryChapter`, `TrustStep` (`TrustIcon`), `Transformation`, `UgcItem`, `FlavourTile` defined in T3 and consumed with matching shapes in T4/T6/T9/T10/T11/T12/T13. Accessor names (`getGoalsSync`, `getBrandStorySync`, `getTrustJourneySync`, `getTransformationsSync`, `getUgcSync`, `getFlavoursSync`, `getBundlesSync`, `getProductsBySlugsSync`) are consistent between T3 (definition) and T4–T15 (use). `Badge` union extended with `"save"` in T2 and used only via the existing `Badge`/`DiscountChip`.

---

## After R0+R1 (follow-on plans — not in this plan)

- **R2 — Commerce propagation:** product detail (gallery carousel, trust-journey tab), `/shop`, `/creatine`, `/accessories` → use `ProductCarousel`; `/cart` refresh; reconcile `QrVerifyCta`.
- **R3 — Content + stories:** `/stories` transformation hub, `/about` (brand story), `/science` (trust journey), `/athletes`, `/blog`, `/resources`, coming-soon teasers, `/track`, `/verify`.
- **R4 — Global chrome + purchase flow:** move `CategoryTileStrip` into nav, refresh `Footer`, `/checkout`, `/order/[id]`, `ExitIntent`, `WhatsAppFab`.
- **R5 — Polish:** motion, responsive, a11y, SEO/meta, light/dark parity, Lighthouse 90+, final QA.
- Complete `src/locales/bn.json` for new keys.

Each follow-on is a separate plan written with the now-validated system in context.
