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

export type Badge = "bestseller" | "lab_tested" | "qr" | "new" | "sale";

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
