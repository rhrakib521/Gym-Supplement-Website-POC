import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "creatine",
    name: { en: "Creatine", bn: "ক্রিয়েটিন" },
    tagline: {
      en: "Research-backed muscle builder",
      bn: "গবেষণানির্ভার পেশি গঠন",
    },
    description: {
      en: "Pure creatine monohydrate — the most studied, most proven supplement in strength sport. Mango Ice, Watermelon Mojito, or Unflavored.",
      bn: "খাঁটি ক্রিয়েটিন মনোহাইড্রেট — সবচেয়ে গবেষণালব্ধ ও প্রমাণিত সাপ্লিমেন্ট। ম্যাঙ্গো আইস, ওয়াটারমেলন মোহিতো বা আনফ্লেভার্ড।",
    },
    status: "live",
    image:
      "https://res.cloudinary.com/ddope55xr/image/upload/v1751739019/WEB_1_by9uon.webp",
    href: "/creatine",
    order: 1,
  },
  {
    slug: "pre-workout",
    name: { en: "Pre-Workout", bn: "প্রি-ওয়ার্কআউট" },
    tagline: { en: "Katana — dropping August 2026", bn: "কাতানা — আগস্ট ২০২৬" },
    description: {
      en: "Clean energy, zero crash. Sachet box and jar variants. Join the waitlist for early access.",
      bn: "পরিষ্কার এনার্জি, কোনো ক্র্যাশ নেই। ওয়েটলিস্টে যুক্ত হোন।",
    },
    status: "coming_soon",
    badge: { en: "Coming Soon", bn: "শীঘ্রই আসছে" },
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    href: "/pre-workout",
    order: 2,
  },
  {
    slug: "activewear",
    name: { en: "Activewear", bn: "অ্যাক্টিভওয়্যার" },
    tagline: {
      en: "A new Thryve brand",
      bn: "নতুন থ্রাইভ ব্র্যান্ড",
    },
    description: {
      en: "Built to train in. A separate identity under Thryve Holdings. Be first to know.",
      bn: "ট্রেনিংয়ের জন্য তৈরি। থ্রাইভ হোল্ডিংসের নতুন ব্র্যান্ড।",
    },
    status: "new_brand",
    badge: { en: "New Brand", bn: "নতুন ব্র্যান্ড" },
    image:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1200&q=80",
    href: "/activewear",
    order: 3,
  },
  {
    slug: "whey",
    name: { en: "Whey Protein", bn: "হুই প্রোটিন" },
    tagline: { en: "The roadmap, 2027", bn: "রোডম্যাপ, ২০২৭" },
    description: {
      en: "Why whey, and what will make Thryve's different. A science teaser for what's coming.",
      bn: "হুই কেন, এবং থ্রাইভকে আলাদা করবে কী।",
    },
    status: "planned",
    badge: { en: "2027", bn: "২০২৭" },
    image:
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=1200&q=80",
    href: "/whey",
    order: 4,
  },
  {
    slug: "accessories",
    name: { en: "Accessories", bn: "অ্যাক্সেসরিজ" },
    tagline: {
      en: "Shakers, belts, wraps",
      bn: "শেকার, বেল্ট, র‍্যাপ",
    },
    description: {
      en: "Complete your stack. Shakers, gym bags, lifting belts, and wrist wraps.",
      bn: "আপনার স্ট্যাক সম্পূর্ণ করুন। শেকার, জিম ব্যাগ, বেল্ট ও র‍্যাপ।",
    },
    status: "live",
    image:
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=1200&q=80",
    href: "/accessories",
    order: 5,
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
