import type { Metadata } from "next";
import { getProducts } from "@/lib/api";
import { PageHeader } from "@/components/layout/page-header";
import { Collection } from "@/components/product/collection";
import type { L } from "@/types";

export const metadata: Metadata = {
  title: "Creatine Monohydrate",
  description:
    "Pure, micronized creatine monohydrate — Mango Ice, Watermelon Mojito, or Unflavored. 5g per serving, QR-verified, made in Bangladesh.",
};

const FLAVOURS: { id: string; name: L }[] = [
  { id: "mango-ice", name: { en: "Mango Ice" } },
  { id: "watermelon-mojito", name: { en: "Watermelon Mojito" } },
  { id: "unflavored", name: { en: "Unflavored" } },
];

export default async function CreatinePage() {
  const all = await getProducts();
  const products = all.filter((p) => p.category === "creatine");
  return (
    <>
      <PageHeader
        eyebrow="Creatine"
        title="Creatine Monohydrate"
        subtitle="The most researched supplement in sport — pure, micronized, and dosed at a true 5g per scoop. Lab-tested every batch."
      />
      <Collection products={products} flavours={FLAVOURS} />
    </>
  );
}
