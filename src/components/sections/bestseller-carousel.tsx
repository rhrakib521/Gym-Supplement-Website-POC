"use client";

import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "./section-heading";
import { ProductCarousel } from "@/components/ui/product-carousel";
import { getProductsSync, getBundlesSync } from "@/lib/api";
import type { Product } from "@/types";

export function BestsellerCarousel() {
  const { t } = useTranslation();
  const all = getProductsSync();
  const creatine = all.filter((p) => p.category === "creatine");
  const best = all.filter((p) => p.bestseller);
  const bundles = getBundlesSync();

  const tabs = [
    { id: "best", label: "Bestsellers", products: (best.length ? best : all) as Product[] },
    { id: "creatine", label: "Creatine", products: creatine },
    { id: "bundles", label: "Bundles", products: bundles },
  ];

  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading
          eyebrow="Most wanted"
          title="Talk of the town"
          action={{ href: "/shop", label: t("common.viewAll") }}
        />
        <div className="mt-8">
          <ProductCarousel tabs={tabs} defaultTabId="best" />
        </div>
      </Container>
    </section>
  );
}
