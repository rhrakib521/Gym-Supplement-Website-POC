import type { Metadata } from "next";
import { getProducts } from "@/lib/api";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { ProductCard } from "@/components/product/product-card";

export const metadata: Metadata = {
  title: "Accessories",
  description:
    "Shakers, gym bags, lifting belts, and wrist wraps. Complete your stack with Thryve gear.",
};

export default async function AccessoriesPage() {
  const all = await getProducts();
  const products = all.filter((p) => p.category === "accessories");
  return (
    <>
      <PageHeader
        eyebrow="Accessories"
        title="Complete your stack"
        subtitle="The gear that goes with the gains — shakers, bags, belts, and wraps."
      />
      <section className="py-12">
        <Container>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
