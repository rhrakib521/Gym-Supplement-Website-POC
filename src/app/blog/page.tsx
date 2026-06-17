import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/api";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Journal",
  description: "Nutrition science, training tips, and product deep-dives from Thryve.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="Science, training & truth"
        subtitle="No bro-science. Just what the evidence says about creatine, training, and supplements in Bangladesh."
      />
      <section className="py-12">
        <Container>
          {featured ? (
            <Link href={`/blog/${featured.slug}`} className="group mb-12 grid gap-6 md:grid-cols-2">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-line">
                <img src={featured.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green">{featured.category.en}</p>
                <h2 className="mt-2 font-display text-2xl font-semibold group-hover:text-green">{featured.title.en}</h2>
                <p className="mt-3 text-ink-dim">{featured.excerpt.en}</p>
                <p className="mt-4 text-xs text-ink-dim">{formatDate(featured.date)} · {featured.readTime}</p>
              </div>
            </Link>
          ) : null}

          <div className="grid gap-6 md:grid-cols-3">
            {rest.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-line">
                  <img src={p.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-green">{p.category.en}</p>
                <h3 className="mt-1.5 font-display text-lg font-medium group-hover:text-green">{p.title.en}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-ink-dim">{p.excerpt.en}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
