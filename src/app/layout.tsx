import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { ExitIntent } from "@/components/layout/exit-intent";
import { TopUtilityBar } from "@/components/layout/top-utility-bar";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thryvebd.com"),
  title: {
    default: "Thryve — Premium Creatine, Made in Bangladesh",
    template: "%s · Thryve",
  },
  description:
    "Lab-tested, QR-authenticated creatine monohydrate. Pure, dosed right, built for Bangladeshi athletes. Train harder. Thryve more.",
  keywords: [
    "Thryve",
    "creatine monohydrate",
    "Bangladesh supplements",
    "gym supplements Bangladesh",
    "lab tested creatine",
    "bKash supplements",
  ],
  applicationName: "Thryve",
  authors: [{ name: "Thryve Sports Supplements" }],
  openGraph: {
    title: "Thryve — Premium Creatine, Made in Bangladesh",
    description:
      "Research-backed, QR-authenticated creatine. Built for Bangladeshi athletes who refuse average.",
    type: "website",
    siteName: "Thryve",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thryve — Premium Creatine",
    description: "Lab-tested, QR-authenticated creatine. Made in Bangladesh.",
  },
  robots: { index: true, follow: true },
};

// Set theme before paint to avoid flash (default: dark — brand is dark-first).
const themeInit = `(function(){try{var t=localStorage.getItem('thryve-theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Thryve",
  url: "https://www.thryvebd.com",
  description:
    "Premium creatine monohydrate, made in Bangladesh. Lab-tested and QR-verified.",
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-lang="en"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${spaceGrotesk.variable} ${hindSiliguri.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-bg text-ink antialiased">
        <Providers>
          <TopUtilityBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <MobileMenu />
          <WhatsAppFab />
          <ExitIntent />
        </Providers>
      </body>
    </html>
  );
}
