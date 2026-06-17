import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Account",
  description: "Sign in to your Thryve account.",
};

export default function AccountPage() {
  return (
    <>
      <PageHeader eyebrow="Account" title="Sign in" subtitle="Order history, subscriptions, and saved details." />
      <section className="py-12">
        <Container>
          <div className="mx-auto max-w-sm rounded-2xl border border-line bg-surface-1 p-6">
            <form action="/account" method="get" className="space-y-3">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Email or phone</span>
                <input className="h-11 w-full rounded-[10px] border border-line bg-bg px-3 text-sm outline-none focus:border-green" placeholder="you@email.com" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Password</span>
                <input type="password" className="h-11 w-full rounded-[10px] border border-line bg-bg px-3 text-sm outline-none focus:border-green" placeholder="••••••••" />
              </label>
              <button type="submit" className="h-11 w-full rounded-[10px] bg-green font-medium text-black hover:bg-green-deep hover:text-white">
                Sign in
              </button>
            </form>
            <p className="mt-4 text-center text-xs text-ink-dim">
              No account? No problem —{" "}
              <a href="/track" className="text-green hover:underline">track your order</a> without one.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
