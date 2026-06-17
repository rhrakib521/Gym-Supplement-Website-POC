/**
 * Thryve API adapter (decision D5).
 *
 * Today every function reads from the local mock-data module and resolves
 * synchronously-wrapped promises. To go live with the Thryve OS back-end,
 * replace each `resolve(...)` body with a fetch to the matching endpoint:
 *
 *   const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`);
 *   return r.json();
 *
 * Components never import mock data directly — they go through this file.
 */

import type { Athlete, BlogPost, Category, Product, Review } from "@/types";
import { categories as categoriesData } from "@/data/categories";
import { products as productsData } from "@/data/products";
import { athletes as athletesData } from "@/data/athletes";
import { reviews as reviewsData } from "@/data/reviews";
import { blogPosts as blogData } from "@/data/blog";

function resolve<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

/* ---------- Products ---------- */

export function getProductsSync(): Product[] {
  return productsData;
}
export function getProductByIdSync(id: string): Product | undefined {
  return productsData.find((p) => p.id === id);
}
export function getProductBySlugSync(slug: string): Product | undefined {
  return productsData.find((p) => p.slug === slug);
}

export async function getProducts(category?: string): Promise<Product[]> {
  const list = category ? productsData.filter((p) => p.category === category) : productsData;
  return resolve(list);
}
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return resolve(getProductBySlugSync(slug));
}
export function getBestsellersSync(): Product[] {
  return productsData.filter((p) => p.bestseller || p.bundle);
}
export async function getBestsellers(): Promise<Product[]> {
  return resolve(getBestsellersSync());
}
export async function getRelated(product: Product): Promise<Product[]> {
  const ids = product.crossSell ?? [];
  return resolve(ids.map((id) => getProductByIdSync(id)).filter(Boolean) as Product[]);
}

/* ---------- Categories ---------- */

export function getCategoriesSync(): Category[] {
  return [...categoriesData].sort((a, b) => a.order - b.order);
}
export async function getCategories(): Promise<Category[]> {
  return resolve(getCategoriesSync());
}
export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return resolve(categoriesData.find((c) => c.slug === slug));
}

/* ---------- Athletes ---------- */

export function getAthletesSync(): Athlete[] {
  return athletesData;
}
export async function getAthletes(): Promise<Athlete[]> {
  return resolve(athletesData);
}

/* ---------- Reviews ---------- */

export function getReviewsForSync(productId: string): Review[] {
  return reviewsData
    .filter((r) => r.productId === productId)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
export async function getReviewsFor(productId: string): Promise<Review[]> {
  return resolve(getReviewsForSync(productId));
}

/* ---------- Blog ---------- */

export function getBlogPostsSync(): BlogPost[] {
  return [...blogData].sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
export async function getBlogPosts(): Promise<BlogPost[]> {
  return resolve(getBlogPostsSync());
}
export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  return resolve(blogData.find((p) => p.slug === slug));
}

/* ---------- Trust / Verify / Track (mock) ---------- */

export interface VerifyResult {
  serial: string;
  authentic: boolean;
  product: string;
  batch: string;
  manufactured: string;
}

const VALID_SERIALS = new Set(["THRYVE-LN204-0001", "THRYVE-LN204-0002", "THRYVE-LN204-0099"]);

export async function verifySerial(serial: string): Promise<VerifyResult> {
  const clean = serial.trim().toUpperCase();
  const authentic = VALID_SERIALS.has(clean) || /^THRYVE-[A-Z0-9]{4,}-\d{3,}$/i.test(clean);
  return resolve({
    serial: clean,
    authentic,
    product: "Creatine Monohydrate",
    batch: "LN-204",
    manufactured: "2026-04",
  });
}

export interface TrackedOrder {
  id: string;
  status: "confirmed" | "processing" | "shipped" | "out_for_delivery" | "delivered";
  placedAt: string;
  eta: string;
  courierLink: string;
  total: number;
}

export async function trackByPhone(_phone: string): Promise<TrackedOrder[]> {
  // Mock: returns a sample order history. Swap for /api/track.
  return resolve([
    {
      id: "THV-100482",
      status: "shipped",
      placedAt: "2026-06-12",
      eta: "2026-06-17",
      courierLink: "#",
      total: 1899,
    },
    {
      id: "THV-099711",
      status: "delivered",
      placedAt: "2026-05-20",
      eta: "2026-05-25",
      courierLink: "#",
      total: 2480,
    },
  ]);
}
