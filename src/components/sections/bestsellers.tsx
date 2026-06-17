"use client";

import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/container";
import { getProductByIdSync } from "@/lib/api";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "./section-heading";
import type { Product } from "@/types";

// Curated 4-up row, bundle/combo always last (per brief §02).
const IDS = [
  "creatine-monohydrate",
  "thryve-shaker",
  "thryve-lifting-belt",
  "creatine-starter-stack",
];

export function Bestsellers() {
  const { t } = useTranslation();
  const products = IDS.map((id) => getProductByIdSync(id)).filter(
    Boolean,
  ) as Product[];

  return (
    <section className="py-20 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Most wanted"
          title="Bestsellers"
          action={{ href: "/shop", label: t("common.viewAll") }}
        />
        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
