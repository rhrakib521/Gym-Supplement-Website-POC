import type { Metadata } from "next";
import { FlaskConical, QrCode, MapPin, Truck } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { BrandStory } from "@/components/sections/brand-story";

export const metadata: Metadata = {
  title: "About",
  description: "Thryve is a Bangladeshi creatine brand built on lab testing, QR authenticity, and trust.",
};

const VALUES = [
  { icon: FlaskConical, title: "Lab-tested, every batch", body: "Third-party tested for purity and heavy metals. The certificate is real and downloadable." },
  { icon: QrCode, title: "QR-authenticated", body: "Every jar carries a unique serial. Verify it in seconds — if it can’t be verified, it isn’t ours." },
  { icon: MapPin, title: "Made in Bangladesh", body: "A local hero brand, not a cheap import copy. Built for Bangladeshi athletes." },
  { icon: Truck, title: "COD, nationwide", body: "Cash on delivery across 689 areas. Try it with zero risk." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Built so Bangladeshi athletes never have to guess."
        subtitle="Thryve started with one frustration: you couldn’t buy creatine in Bangladesh and actually trust it. So we made one you can."
      />

      <BrandStory />

      <section className="border-y border-line bg-surface-1 py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-line bg-bg p-6">
                <v.icon className="h-6 w-6 text-green" />
                <p className="mt-3 font-medium">{v.title}</p>
                <p className="mt-1 text-sm text-ink-dim">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 text-center">
        <Container>
          <h2 className="font-display text-2xl font-semibold md:text-3xl">Try the creatine people trust.</h2>
          <p className="mx-auto mt-3 max-w-md text-ink-dim">Lab-tested, QR-verified, delivered with COD. No risk.</p>
          <Button href="/creatine" size="lg" className="mt-6">Shop Creatine</Button>
        </Container>
      </section>
    </>
  );
}
