import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types";
import { getProductBySlugSync } from "@/lib/api";
import { formatBDT } from "@/lib/format";
import { Price } from "@/components/ui/price";
import { Stars } from "@/components/ui/stars";
import { MegaLink, MegaCol } from "./mega-primitives";

export function MegaPanel({ cat }: { cat: Category }) {
  switch (cat.slug) {
    case "creatine":
      return <CreatinePanel />;
    case "accessories":
      return <AccessoriesPanel />;
    case "pre-workout":
      return (
        <ComingPanel
          title="Katana"
          tagline="Our pre-workout. Clean energy, zero crash."
          when="Dropping August 2026"
          cta={{ href: "/pre-workout", label: "Join the waitlist" }}
        />
      );
    case "activewear":
      return (
        <ComingPanel
          title="A new Thryve brand"
          tagline="Built to train in. A separate identity under Thryve Holdings."
          when="New brand dropping"
          cta={{ href: "/activewear", label: "Get early access" }}
          accent
        />
      );
    case "whey":
      return (
        <ComingPanel
          title="Whey Protein"
          tagline="On the roadmap. We're doing it properly — not first."
          when="Coming 2027"
          cta={{ href: "/whey", label: "See the science teaser" }}
        />
      );
    default:
      return null;
  }
}

function CreatinePanel() {
  const featured = getProductBySlugSync("creatine-monohydrate");
  return (
    <div className="flex w-[clamp(320px,46vw,560px)] gap-8 p-6">
      <div className="flex-1 space-y-5">
        <MegaCol title="By Flavour">
          <MegaLink href="/creatine?flavour=mango-ice">Mango Ice</MegaLink>
          <MegaLink href="/creatine?flavour=watermelon-mojito">Watermelon Mojito</MegaLink>
          <MegaLink href="/creatine?flavour=unflavored">Unflavored</MegaLink>
        </MegaCol>
        <MegaCol title="By Goal">
          <MegaLink href="/creatine?goal=muscle">Muscle Building</MegaLink>
          <MegaLink href="/creatine?goal=strength">Strength</MegaLink>
          <MegaLink href="/creatine?goal=recovery">Recovery</MegaLink>
        </MegaCol>
      </div>
      <div className="w-px bg-line" />
      <div className="w-44 space-y-5">
        <MegaCol title="More">
          <MegaLink href="/product/creatine-starter-stack">Bundles</MegaLink>
          <MegaLink href="/science">Lab Certificate</MegaLink>
          <MegaLink href="/verify">QR Verify</MegaLink>
        </MegaCol>
        {featured ? (
          <Link
            href={`/product/${featured.slug}`}
            className="group block rounded-xl border border-line bg-surface-1 p-3 transition-colors hover:border-green"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-surface-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.images[0]}
                alt={featured.name}
                className="h-full w-full object-contain"
              />
            </div>
            <p className="mt-2 text-xs font-medium text-ink">{featured.name}</p>
            <Price price={featured.price} compareAt={featured.compareAt} size="sm" />
            <Stars rating={featured.rating} size={11} className="mt-1" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

function AccessoriesPanel() {
  return (
    <div className="w-64 p-6">
      <MegaCol title="Gear">
        <MegaLink href="/product/thryve-shaker">Shaker 600ml</MegaLink>
        <MegaLink href="/product/thryve-gym-bag">Gym Duffel</MegaLink>
        <MegaLink href="/product/thryve-lifting-belt">Lifting Belt</MegaLink>
        <MegaLink href="/product/thryve-wrist-wraps">Wrist Wraps</MegaLink>
      </MegaCol>
      <Link
        href="/accessories"
        className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-green"
      >
        Complete your stack <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function ComingPanel({
  title,
  tagline,
  when,
  cta,
  accent,
}: {
  title: string;
  tagline: string;
  when: string;
  cta: { href: string; label: string };
  accent?: boolean;
}) {
  return (
    <div className="w-72 p-6">
      <span
        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ring-1 ring-inset ${
          accent ? "bg-green/12 text-green ring-green/30" : "bg-surface-2 text-ink-dim ring-line"
        }`}
      >
        {when}
      </span>
      <p className="mt-3 font-display text-lg text-ink">{title}</p>
      <p className="mt-1 text-sm text-ink-dim">{tagline}</p>
      <Link
        href={cta.href}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-green"
      >
        {cta.label} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
