# Thryve — Performance Editorial R2 (Commerce Propagation) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Propagate the Performance Editorial system (from R0+R1) into the commerce pages — product detail, shop, cart — and retire the dead components R0+R1 left behind. Outcome: the whole purchase path looks/feels like the new homepage, with badge discipline applied everywhere discounts appear.

**Architecture:** In-place edits to existing pages/components. No new primitives needed — R2 reuses the R0+R1 system (`Stepper`, `BestsellerCarousel`, `getTrustJourneySync`, the `--volt` token, `DiscountChip` discipline). One shared fix (`Price`) propagates to every card automatically. Highest leverage, smallest footprint.

**Tech Stack:** Next.js 16.2.9 (App Router) · React 19 · TypeScript 5 · Tailwind CSS v4 · framer-motion · zustand.

**Spec:** [`docs/superpowers/specs/2026-06-24-thryve-beastlife-blend-redesign.md`](../specs/2026-06-24-thryve-beastlife-blend-redesign.md) · **Prev plan:** [`2026-06-24-thryve-performance-editorial-r0-r1.md`](./2026-06-24-thryve-performance-editorial-r0-r1.md) · **Log:** [`docs/PROJECT_LOG.md`](../../PROJECT_LOG.md).

## Global Constraints

- **Verification method (no unit-test runner in this project).** Each task's gate = `npm run build` exiting 0 (this also type-checks), plus `npm run lint` introducing **no new errors**. This matches the project's established QA (PROJECT_LOG §9). Do **not** add a test framework.
- **Badge discipline (binding).** Savings/discount chips are **amber + quiet** (`bg-amber/12 text-amber`, small/typographic), never red and never large. Quality badges (Bestseller/Lab/QR) stay tasteful. This is the core R2 rule.
- **`--volt` is a spark, not paint** — used sparingly for energy accents (progress fills, eyebrows).
- **Data via `lib/api.ts`** (D5). The PDP trust journey reads `getTrustJourneySync()` — do not import `@/data/*` directly in components.
- **i18n (D3):** EN-first; new static labels may use `t("key", { defaultValue })` or plain EN strings. No `new Date()`/`Math.random()` in module scope.
- **No `<img>` → `next/image` conversion this pass** (deferred to R5) — keep using `<img>` to match the existing codebase.
- **Commit per task** (standard); the user drives git on their own cadence and may batch into one commit at the end — that's fine.

## Reasoned deviation (flagged)

The R0+R1 plan's loose R2 note said "/shop, /creatine, /accessories → use ProductCarousel". After reading those pages, the **senior call is to keep their filterable grids** (ShopBrowser/Collection) — a carousel is wrong UX for browse+filter+compare, and those grids already render through the shared `ProductCard`, so they inherit every R2 card fix automatically. Instead, `/shop` gets one **featured `BestsellerCarousel`** row at the top (discovery → then filter). This is a deliberate, documented deviation; if the human wants carousels on collection pages too, that's a follow-up.

---

## File Structure (this pass)

**Modified:**
- `src/components/ui/price.tsx` — discount chip red → amber (badge discipline).
- `src/components/product/product-detail.tsx` — amber savings chip + compact trust-journey block.
- `src/app/shop/page.tsx` — featured `BestsellerCarousel` row.
- `src/app/cart/page.tsx` — volt free-delivery progress bar + unlocked state.

**Deleted (dead after R0+R1, zero imports):**
- `src/components/sections/qr-verify-cta.tsx`
- `src/components/sections/category-strip.tsx`
- `src/components/sections/bestsellers.tsx`

---

## Task 1: Badge discipline in `Price` (discount chip red → amber)

**Files:**
- Modify: `src/components/ui/price.tsx`

**Interfaces:**
- Produces: `Price`'s discount chip is now amber (`bg-amber/12 text-amber`), aligning with `DiscountChip`. Because `ProductCard` (and thus every shop/category/bestseller grid) and `ProductDetail` render `Price`, this single fix propagates badge discipline across all commerce surfaces.

- [ ] **Step 1: Swap the discount chip classes to amber**

In `src/components/ui/price.tsx`, find the `pct > 0` block and change it from red to amber:

Replace:
```tsx
      {pct > 0 ? (
        <span className="rounded bg-red/12 px-1.5 py-0.5 text-xs font-semibold text-red">
          −{l === "bn" ? toBn(pct) : pct}%
        </span>
      ) : null}
```
with:
```tsx
      {pct > 0 ? (
        <span className="rounded-md bg-amber/12 px-1.5 py-0.5 text-xs font-bold text-amber">
          −{l === "bn" ? toBn(pct) : pct}%
        </span>
      ) : null}
```

- [ ] **Step 2: Build-check**

Run: `npm run build`
Expected: exit 0 (33 routes). The discount chips on all product cards now render amber instead of red.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/price.tsx
git commit -m "feat(redesign-R2): Price discount chip → amber (badge discipline)"
```

---

## Task 2: Product detail — trust journey + amber savings

**Files:**
- Modify: `src/components/product/product-detail.tsx`

**Interfaces:**
- Consumes: `Stepper` (`@/components/ui/stepper`, built R0) and `getTrustJourneySync()` (`@/lib/api`, built R0). Both already exist.
- Produces: a compact "Why your jar is real" trust-journey block on every PDP (Source → Lab → Jar → QR), and an amber savings chip on the subscribe price.

- [ ] **Step 1: Add the two imports**

In `src/components/product/product-detail.tsx`, add to the existing imports (next to the other `@/components/...` and `@/lib/...` imports):

```tsx
import { getTrustJourneySync } from "@/lib/api";
import { Stepper } from "@/components/ui/stepper";
```

- [ ] **Step 2: Make the subscription savings chip amber**

Find the subscribe-price savings chip and change green → amber. Replace:
```tsx
                <span className="rounded bg-green/12 px-1.5 py-0.5 text-xs text-green">Save {discount}%</span>
```
with:
```tsx
                <span className="rounded-md bg-amber/12 px-1.5 py-0.5 text-xs font-bold text-amber">Save {discount}%</span>
```

- [ ] **Step 3: Insert the trust-journey block**

Find the closing of the two-column grid and the start of the tabs section:

```tsx
        </div>
      </div>

      <div className="mt-16">
        <div className="flex flex-wrap gap-1 border-b border-line">
```

Insert the trust-journey block between `</div>` (grid close) and `<div className="mt-16">` (tabs), so it becomes:

```tsx
        </div>
      </div>

      <div className="mt-16 rounded-3xl border border-line bg-surface-1 p-6 md:p-8">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-volt">
          Why your jar is real
        </p>
        <Stepper steps={getTrustJourneySync()} lang={lang} />
      </div>

      <div className="mt-16">
        <div className="flex flex-wrap gap-1 border-b border-line">
```

- [ ] **Step 4: Build-check**

Run: `npm run build`
Expected: exit 0; `/product/[slug]` pages still prerender (SSG). The PDP now shows the trust stepper above the content tabs.

- [ ] **Step 5: Commit**

```bash
git add src/components/product/product-detail.tsx
git commit -m "feat(redesign-R2): PDP trust-journey block + amber savings"
```

---

## Task 3: Shop page — featured BestsellerCarousel row

**Files:**
- Modify: `src/app/shop/page.tsx`

**Interfaces:**
- Consumes: `BestsellerCarousel` (`@/components/sections/bestseller-carousel`, built R1) — it self-fetches via `getProductsSync`, so the server page just renders it.

- [ ] **Step 1: Import and render the carousel**

In `src/app/shop/page.tsx`, add the import with the others:

```tsx
import { BestsellerCarousel } from "@/components/sections/bestseller-carousel";
```

Then render it between `PageHeader` and `ShopBrowser`. Replace the `return` body:

```tsx
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="The full range"
        subtitle="Creatine, gear, and stacks — lab-tested, QR-verified, delivered across Bangladesh with cash on delivery."
      />
      <BestsellerCarousel />
      <ShopBrowser products={products} />
    </>
  );
```

- [ ] **Step 2: Build-check**

Run: `npm run build`
Expected: exit 0; `/shop` prerenders with the featured "Talk of the town" carousel above the filterable grid.

- [ ] **Step 3: Commit**

```bash
git add src/app/shop/page.tsx
git commit -m "feat(redesign-R2): featured BestsellerCarousel on /shop"
```

---

## Task 4: Cart — volt free-delivery progress bar

**Files:**
- Modify: `src/app/cart/page.tsx`

**Interfaces:**
- Consumes: `useCartSubtotal()`, `site.freeDeliveryThreshold` (both already used on the page).

- [ ] **Step 1: Replace the free-delivery text with a volt progress bar**

In `src/app/cart/page.tsx`, inside the summary `<aside>`, find the "Add X more for free delivery" block:

```tsx
            {delivery > 0 ? (
              <p className="text-xs text-ink-dim">
                Add {formatBDT(site.freeDeliveryThreshold - subtotal, lang)} more for free delivery.
              </p>
            ) : null}
```

Replace it with a progress bar (and an "unlocked" state when delivery is free):

```tsx
            {delivery > 0 ? (
              <div className="pt-1">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                  <div
                    className="h-full rounded-full bg-volt transition-all"
                    style={{
                      width: `${Math.min(100, Math.round((subtotal / site.freeDeliveryThreshold) * 100))}%`,
                    }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-ink-dim">
                  Add {formatBDT(site.freeDeliveryThreshold - subtotal, lang)} more for free delivery.
                </p>
              </div>
            ) : (
              <p className="text-xs font-medium text-green">You&apos;ve unlocked free delivery.</p>
            )}
```

- [ ] **Step 2: Build-check**

Run: `npm run build`
Expected: exit 0; `/cart` prerenders. The summary shows a volt progress bar toward free delivery (or the unlocked message when over threshold).

- [ ] **Step 3: Commit**

```bash
git add src/app/cart/page.tsx
git commit -m "feat(redesign-R2): cart free-delivery volt progress bar"
```

---

## Task 5: Delete dead components (retired by R0+R1)

**Files:**
- Delete: `src/components/sections/qr-verify-cta.tsx`, `src/components/sections/category-strip.tsx`, `src/components/sections/bestsellers.tsx`

**Interfaces:**
- These three components have **zero imports** after R0+R1 (the homepage replaced `QrVerifyCta` → `TrustJourney`, `CategoryStrip` → `CategoryTileStrip`, `Bestsellers` → `BestsellerCarousel`). This task verifies that, then removes them.

- [ ] **Step 1: Verify nothing imports them**

Run a search across `src/` for any import of the three components:

```bash
cd "D:\E DRIVE\Periscale Projects POC\Gym Supplement Website idea"
grep -rnE "qr-verify-cta|QrVerifyCta|sections/category-strip|CategoryStrip|sections/bestsellers|import.*Bestsellers\b" src || echo "NO IMPORTS FOUND — safe to delete"
```

Expected: `NO IMPORTS FOUND — safe to delete` (the only matches should be the files' own definitions, which the regex excludes by matching import paths/names). If any real import appears, **stop** and re-wire that caller before deleting.

- [ ] **Step 2: Delete the three files**

```bash
rm src/components/sections/qr-verify-cta.tsx \
   src/components/sections/category-strip.tsx \
   src/components/sections/bestsellers.tsx
```

- [ ] **Step 3: Build-check**

Run: `npm run build`
Expected: exit 0, 33 routes. (If a route fails to compile, a dangling import survived — re-run Step 1's grep to find it and fix the caller.)

- [ ] **Step 4: Commit**

```bash
git add -A src/components/sections/
git commit -m "chore(redesign-R2): delete dead QrVerifyCta/CategoryStrip/Bestsellers"
```

---

## Self-Review (done during planning)

**Spec coverage:** §2.2 badge discipline → Task 1 (Price, propagates everywhere) + Task 2 (PDP savings chip). §3.3 `Stepper`/`TrustJourney` reuse on PDP → Task 2. §4 commerce propagation (shop) → Task 3. `/cart` refresh → Task 4. Dead-component reconciliation → Task 5. `/creatine` + `/accessories` need no task — they render through shared `ProductCard`/`Price`, so they inherit Task 1's badge fix and the existing grid is correct UX (documented deviation).

**Placeholder scan:** none — every step has the exact find/replace strings or complete code.

**Type consistency:** `Stepper` is called as `Stepper steps={getTrustJourneySync()} lang={lang}` — matches its R0 signature `({ steps: {id,icon:TrustIcon,title:L,detail:L}[]; lang: Lang })`. `getTrustJourneySync()` returns `TrustStep[]` which matches. `BestsellerCarousel` takes no props (self-fetching) — matches R1. `Price`/cart edits are class-string swaps only — no signature changes. No new types introduced.

**Risk:** Task 5's grep is the only deletion — guarded by the verify-then-delete steps and a build gate that would catch any dangling import.

---

## After R2 (follow-on plans)

- **R3 — Content + stories:** `/stories` transformation hub, `/about` (full brand story), `/science` (trust journey), `/athletes`, `/blog`, `/resources`, coming-soon teasers, `/track`, `/verify`. Includes fixing the 7 pre-existing lint errors in `about`/`order`/`resources`.
- **R4 — Global chrome + purchase flow:** move `CategoryTileStrip` into nav, refresh `Footer`, `/checkout`, `/order/[id]`, `ExitIntent`, `WhatsAppFab`.
- **R5 — Polish:** `<img>` → `next/image`, motion pass, responsive/a11y audit, SEO/meta, light/dark parity, Lighthouse 90+, final QA.
