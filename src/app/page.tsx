import { Hero } from "@/components/sections/hero";
import { MarqueeBar } from "@/components/sections/marquee-bar";
import { CategoryStrip } from "@/components/sections/category-strip";
import { Bestsellers } from "@/components/sections/bestsellers";
import { SocialProof } from "@/components/sections/social-proof";
import { AthletesStrip } from "@/components/sections/athletes-strip";
import { BlogPreview } from "@/components/sections/blog-preview";
import { QrVerifyCta } from "@/components/sections/qr-verify-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeBar />
      <CategoryStrip />
      <Bestsellers />
      <SocialProof />
      <AthletesStrip />
      <BlogPreview />
      <QrVerifyCta />
    </>
  );
}
