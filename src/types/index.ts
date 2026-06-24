// Shared domain types for Thryve front-end.

export type Lang = "en" | "bn";

/** Localized string. `bn` is optional — EN-first per decision D3. */
export type L = { en: string; bn?: string };

export type CategoryStatus = "live" | "coming_soon" | "new_brand" | "planned";

export interface Category {
  slug: string;
  name: L;
  tagline: L;
  description: L;
  status: CategoryStatus;
  badge?: L; // overlay label e.g. "Coming Soon" / "2027" / "New Brand"
  image: string;
  href: string;
  order: number;
}

export interface Flavour {
  id: string;
  name: L;
  inStock: boolean;
  stockCount?: number;
}

export interface Review {
  id: string;
  productId: string;
  name: string;
  city: string;
  rating: number; // 1–5
  date: string; // ISO
  text: string;
  verified: boolean;
}

// Badge discipline (R2): "save" added; discount badges are quiet + amber.
export type Badge = "bestseller" | "lab_tested" | "qr" | "new" | "sale" | "save";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string; // category slug
  variantLabel: L; // "60 servings · 300g"
  shortDescription: L;
  about: L; // tab: About
  ingredients: L; // tab: Ingredients
  howToUse: L; // tab: How To Use
  price: number; // current BDT
  compareAt?: number; // original (for discount)
  servings?: number;
  rating: number;
  reviewCount: number;
  badges: Badge[];
  flavours: Flavour[];
  images: string[];
  certificateUrl?: string;
  bestseller?: boolean;
  bundle?: boolean;
  crossSell?: string[]; // product ids
  subscriptionDiscount?: number; // percent, e.g. 13
}

export interface Athlete {
  id: string;
  name: string;
  sport: L;
  city: L;
  code: string;
  image: string;
  quote: L;
  instagram?: string;
}

export interface BlogPost {
  slug: string;
  title: L;
  excerpt: L;
  category: L;
  author: string;
  date: string; // ISO
  readTime: string;
  image: string;
}

export interface CartLine {
  productId: string;
  flavourId: string;
  qty: number;
}

/* ---------- Redesign (Performance Editorial) story content ---------- */

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
