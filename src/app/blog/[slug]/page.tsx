import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPost, getBlogPosts, getProductByIdSync } from "@/lib/api";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { formatDate } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getBlogPost(slug);
  if (!p) return { title: "Not found" };
  return { title: p.title.en, description: p.excerpt.en };
}

const BODIES: Record<string, string[]> = {
  "creatine-101-what-5g-a-day-does": [
    "Creatine monohydrate is the single most-studied supplement in sports science — over 500 peer-reviewed papers and counting. It works by increasing your muscles' phosphocreatine stores, which helps regenerate ATP, the energy your cells use for short, explosive efforts.",
    "At a true 5g per day, taken consistently, creatine reliably improves strength, power output, and lean mass. There's no need to load, no need to time it precisely, and no benefit to fancy variants — monohydrate is the one the evidence backs.",
    "What matters is purity and consistency. That's why every Thryve batch is third-party lab tested for purity and heavy metals, and sealed with a QR you can verify yourself.",
  ],
  "fake-supplements-bangladesh-truth": [
    "The fear of fake supplements in Bangladesh is real — and justified. Imported jars get refilled, labels get copied, and unverified product ends up on shelves. The result is a market where trust is the actual product.",
    "The fix isn't marketing. It's verification. Every Thryve jar carries a unique QR serial under the lid. Enter it on our site and you see the batch, the lab result, and a confirmation it's genuine — in seconds.",
    "If a jar can't be verified, it's not ours. That's the standard we think every local brand should meet.",
  ],
  "train-for-first-100kg-bench": [
    "A 100kg bench is a milestone — and it's built on three things: progressive overload, technique, and recovery. Chasing the number without the foundation is how progress stalls and shoulders get hurt.",
    "Progressive overload means adding a little weight, or a little volume, over time — and actually recovering from it. Most lifters under-eat and under-sleep, then blame the program.",
    "Creatine fits here because it nudges your top-end output and recovery just enough to keep the progression moving. It's not magic. It's the 1% you can count on, every week.",
  ],
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const p = await getBlogPost(slug);
  if (!p) notFound();

  const body = BODIES[slug] ?? [p.excerpt.en];
  const related = getProductByIdSync("creatine-monohydrate");

  return (
    <article>
      <div className="relative h-[42vh] min-h-[280px] w-full overflow-hidden border-b border-line">
        <img src={p.image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
      </div>

      <Container className="py-12">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green">{p.category.en}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">{p.title.en}</h1>
          <p className="mt-3 text-sm text-ink-dim">{p.author} · {formatDate(p.date)} · {p.readTime}</p>
          <p className="mt-6 text-lg text-ink-dim">{p.excerpt.en}</p>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-dim">
            {body.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </div>

        {related ? (
          <div className="mx-auto mt-14 max-w-2xl">
            <h2 className="font-display text-lg font-semibold">Try it</h2>
            <div className="mt-4">
              <ProductCard product={related} />
            </div>
          </div>
        ) : null}

        <div className="mx-auto mt-10 max-w-2xl">
          <Button href="/blog" variant="subtle">← Back to journal</Button>
        </div>
      </Container>
    </article>
  );
}
