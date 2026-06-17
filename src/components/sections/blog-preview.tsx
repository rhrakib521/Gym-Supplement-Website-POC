"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/ui/container";
import { getBlogPostsSync } from "@/lib/api";
import { tx, formatDate } from "@/lib/format";
import { useLang } from "@/lib/use-lang";
import { SectionHeading } from "./section-heading";

export function BlogPreview() {
  const { t } = useTranslation();
  const lang = useLang();
  const posts = getBlogPostsSync().slice(0, 3);

  return (
    <section className="py-20 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={t("nav.journal")}
          title="Science, training & truth"
          action={{ href: "/blog", label: t("common.viewAll") }}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-line">
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-green">
                {tx(p.category, lang)}
              </p>
              <h3 className="mt-1.5 font-display text-lg font-medium text-ink group-hover:text-green">
                {tx(p.title, lang)}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-ink-dim">
                {tx(p.excerpt, lang)}
              </p>
              <p className="mt-3 text-xs text-ink-dim">
                {formatDate(p.date, lang)} · {p.readTime}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
