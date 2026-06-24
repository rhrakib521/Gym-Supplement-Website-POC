"use client";

import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "./section-heading";
import { ProductCarousel } from "@/components/ui/product-carousel";
import { getBundlesSync } from "@/lib/api";

export function StackCarousel() {
  const { t } = useTranslation();
  const bundles = getBundlesSync();

  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading
          eyebrow="Stack up"
          title="Bundles & stacks"
          action={{ href: "/shop", label: t("common.viewAll") }}
        />
        <div className="mt-10">
          <ProductCarousel products={bundles} />
        </div>
      </Container>
    </section>
  );
}
