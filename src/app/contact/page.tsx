import type { Metadata } from "next";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Thryve — WhatsApp, email, or visit us in Dhaka.",
};

export default function ContactPage() {
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Thryve!")}`;
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to us"
        subtitle="WhatsApp is fastest — we usually reply within the hour during business hours."
      />
      <section className="py-12">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-line bg-surface-1 p-6 transition-colors hover:border-green"
            >
              <MessageCircle className="h-6 w-6 text-green" />
              <p className="mt-3 font-medium">WhatsApp</p>
              <p className="mt-1 text-sm text-ink-dim">{site.whatsappDisplay}</p>
              <p className="mt-3 text-sm text-green">Chat now →</p>
            </a>

            <a
              href={`mailto:${site.email}`}
              className="group rounded-2xl border border-line bg-surface-1 p-6 transition-colors hover:border-green"
            >
              <Mail className="h-6 w-6 text-green" />
              <p className="mt-3 font-medium">Email</p>
              <p className="mt-1 text-sm text-ink-dim">{site.email}</p>
              <p className="mt-3 text-sm text-green">Write to us →</p>
            </a>

            <div className="rounded-2xl border border-line bg-surface-1 p-6">
              <MapPin className="h-6 w-6 text-green" />
              <p className="mt-3 font-medium">Address</p>
              <p className="mt-1 text-sm text-ink-dim">{site.address.en}</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
