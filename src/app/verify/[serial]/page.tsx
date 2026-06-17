import type { Metadata } from "next";
import { verifySerial } from "@/lib/api";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

type Props = { params: Promise<{ serial: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serial } = await params;
  return { title: `Verify ${decodeURIComponent(serial)}` };
}

export default async function VerifyResult({ params }: Props) {
  const { serial } = await params;
  const result = await verifySerial(decodeURIComponent(serial));

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-lg text-center">
        {result.authentic ? (
          <>
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-green/15">
              <CheckCircle2 className="h-8 w-8 text-green" />
            </div>
            <h1 className="mt-5 font-display text-3xl font-semibold">Authentic ✓</h1>
            <p className="mt-2 text-ink-dim">
              Serial <span className="font-mono text-ink">{result.serial}</span> is a genuine Thryve product.
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-red/15">
              <XCircle className="h-8 w-8 text-red" />
            </div>
            <h1 className="mt-5 font-display text-3xl font-semibold">We couldn&apos;t verify this</h1>
            <p className="mt-2 text-ink-dim">
              Serial <span className="font-mono text-ink">{result.serial}</span> didn&apos;t match our records.
              Contact us if you believe this is an error.
            </p>
          </>
        )}

        <dl className="mx-auto mt-8 grid max-w-sm grid-cols-2 gap-3 text-left text-sm">
          <div className="rounded-xl border border-line p-3">
            <dt className="text-ink-dim">Product</dt>
            <dd className="font-medium">{result.product}</dd>
          </div>
          <div className="rounded-xl border border-line p-3">
            <dt className="text-ink-dim">Batch</dt>
            <dd className="font-medium">{result.batch}</dd>
          </div>
        </dl>

        <div className="mt-8 flex justify-center gap-2">
          <Button href="/verify" variant="subtle" size="sm">Verify another</Button>
          <Button href="/shop" size="sm">Shop Thryve</Button>
        </div>
      </div>
    </Container>
  );
}
