import { Container } from "@/components/ui/container";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b border-line">
      <Container className="py-14 md:py-20">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-green">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-balance font-display text-4xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-pretty text-ink-dim">{subtitle}</p>
        ) : null}
      </Container>
    </section>
  );
}
