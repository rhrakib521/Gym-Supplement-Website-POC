import type { Metadata } from "next";
import { getProducts } from "@/lib/api";
import { PageHeader } from "@/components/layout/page-header";
import { ShopBrowser } from "@/components/product/shop-browser";
import { BestsellerCarousel } from "@/components/sections/bestseller-carousel";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop Thryve — creatine monohydrate, accessories, and stacks. Lab-tested, QR-verified, made in Bangladesh.",
};

export default async function ShopPage() {
  const products = await getProducts();
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
}
