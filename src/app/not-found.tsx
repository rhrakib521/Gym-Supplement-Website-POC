import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="font-display text-7xl font-bold text-green">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-ink-dim">The page you&apos;re looking for doesn&apos;t exist or moved.</p>
      <Button href="/" className="mt-6">Back home</Button>
    </Container>
  );
}
