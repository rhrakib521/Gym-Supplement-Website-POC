import type { MetadataRoute } from "next";
import { getProductsSync, getBlogPostsSync } from "@/lib/api";

const BASE = "https://www.thryvebd.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const make = (path: string) => ({ url: `${BASE}${path}`, lastModified: now, changeFrequency: "weekly" as const, priority: path === "/" ? 1 : 0.7 });

  const staticRoutes = [
    "/", "/shop", "/creatine", "/accessories", "/athletes", "/science",
    "/stories", "/resources", "/blog", "/about", "/contact", "/track",
    "/verify", "/pre-workout", "/activewear", "/whey",
  ];

  const productRoutes = getProductsSync().map((p) => `/product/${p.slug}`);
  const blogRoutes = getBlogPostsSync().map((p) => `/blog/${p.slug}`);

  return [...staticRoutes, ...productRoutes, ...blogRoutes].map(make);
}
