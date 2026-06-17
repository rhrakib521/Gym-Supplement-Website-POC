# Thryve Website Revamp — Design Specification (snapshot)

**Date:** 2026-06-16 · **Status:** Approved-for-build · **Owner:** Periscale Projects

> This is the frozen design snapshot. The **living master log** — with full decision history,
> research, execution progress, and handoff notes — is at
> [`docs/PROJECT_LOG.md`](../../PROJECT_LOG.md). **Read that first; it is authoritative.**

## One-liner
Premium, bilingual (EN-first) front-end rebuild of thryvebd.com for a Bangladeshi creatine brand.
Refined-editorial design, full ecommerce experience, on a clean mock-data layer ready to drop onto
the Thryve OS back-end later.

## Key decisions
- **D1 Scope:** front-end + mock-data layer (no live back-end/payments yet).
- **D2 Design:** *Refined & Editorial* — dark but airy, aspirational, identity-led, generous whitespace, green as punctuation.
- **D3 i18n:** EN-first, full react-i18next architecture, Bangla on key surfaces.
- **D4 Stack:** Next.js 15 (App Router) + TypeScript + Tailwind + react-i18next + Framer Motion + Zustand.
- **D5 Data:** typed mock-data + `lib/api.ts` adapter mirroring Thryve OS endpoints.

## Design system (summary — full tokens in PROJECT_LOG §5)
- Colors: `--bg #0B0F13`, `--surface-1 #12161B`, `--ink #F2F5F7`, accent `--green #1D9E75` (sparingly), `--amber #E8A020` (upsell).
- Type: Space Grotesk (display) + Inter (body) + Hind Siliguri (BN) + optional Fraunces accent serif. Fluid scale.
- Spacing: section `clamp(5rem,10vw,9rem)`, container `1240px`.
- Motion: Framer Motion, calm (fade/blur/slide, subtle parallax, marquee); reduced-motion safe.

## In scope (~20 pages)
Home, Shop, Creatine, Accessories, Product detail, Cart, Checkout (3-step), Confirmation,
Track order, QR Verify, Athletes, Science, About, Blog (list+post), Contact, Stories, Resources,
plus coming-soon teasers (Pre-Workout/Katana, Activewear, Whey), and global chrome (mega-nav,
footer, WhatsApp bar, language toggle, cart drawer, exit-intent popup).

## Out of scope (this pass)
Live payments, back-end wiring, headless CMS, real client assets (using stock + mockups), full Bangla marketing copy.

## Build phases
P0 Foundation → P1 Global+Home → P2 Product → P3 Purchase+Trust → P4 Content+Teasers → P5 Polish.
(Phase detail + checkboxes in PROJECT_LOG §8.)

## Definition of done (this pass)
Every page renders, is responsive, accessible (WCAG 2.1 AA), SEO-meta'd, light/dark supported,
bilingual toggle working on key surfaces, cart→checkout→confirmation flow functional on mock data,
and Lighthouse 90+ mobile. All decisions + progress logged in PROJECT_LOG §9.
