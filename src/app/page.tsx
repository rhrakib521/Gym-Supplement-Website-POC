import { Hero } from "@/components/sections/hero";
import { MarqueeBar } from "@/components/sections/marquee-bar";
import { CategoryTileStrip } from "@/components/sections/category-tile-strip";
import { BestsellerCarousel } from "@/components/sections/bestseller-carousel";
import { GoalJourney } from "@/components/sections/goal-journey";
import { BrandStory } from "@/components/sections/brand-story";
import { TrustJourney } from "@/components/sections/trust-journey";
import { FlavourPicker } from "@/components/sections/flavour-picker";
import { StackCarousel } from "@/components/sections/stack-carousel";
import { TransformationStrip } from "@/components/sections/transformation-strip";
import { SocialProof } from "@/components/sections/social-proof";
import { AthletesStrip } from "@/components/sections/athletes-strip";
import { BlogPreview } from "@/components/sections/blog-preview";
import { UgcGrid } from "@/components/sections/ugc-grid";

export default function Home() {
  return (
    <>
      {/* 3 */}<CategoryTileStrip />
      {/* 4 */}<Hero />
      {/* 5 */}<MarqueeBar />
      {/* 6 */}<BestsellerCarousel />
      {/* 7 — STORY */}<GoalJourney />
      {/* 8 — STORY */}<BrandStory />
      {/* 9 — STORY */}<TrustJourney />
      {/* 10 */}<FlavourPicker />
      {/* 11 */}<StackCarousel />
      {/* 12 */}<TransformationStrip />
      {/* 13 */}<SocialProof />
      {/* 14 */}<AthletesStrip />
      {/* 15 */}<BlogPreview />
      {/* 16 */}<UgcGrid />
    </>
  );
}
