import type { Product } from "@/types";

const JAR_IMG =
  "https://res.cloudinary.com/ddope55xr/image/upload/v1751739019/WEB_1_by9uon.webp";
const JAR_IMG_2 =
  "https://res.cloudinary.com/ddope55xr/image/upload/v1751739170/Product_Featured_qb5ksx.webp";
const PLACEHOLDER = "/product-placeholder.svg";

export const products: Product[] = [
  {
    id: "creatine-monohydrate",
    slug: "creatine-monohydrate",
    name: "Creatine Monohydrate",
    category: "creatine",
    variantLabel: { en: "60 servings · 300g", bn: "৬০ সার্ভিং · ৩০০g" },
    shortDescription: {
      en: "Pure, micronized creatine monohydrate. 5g per serving, zero fillers, QR-verified.",
      bn: "খাঁটি মাইক্রোনাইজড ক্রিয়েটিন মনোহাইড্রেট। প্রতি সার্ভিং ৫g, QR যাচাইকৃত।",
    },
    about: {
      en: "Creatine monohydrate is the most researched sports supplement on earth — over 500 studies back it for strength, power, and lean mass. Thryve's is micronized for easy mixing, third-party lab tested per batch, and sealed with a unique QR so you always know your jar is real. No fillers, no fluff — just 5g of what works.",
      bn: "ক্রিয়েটিন মনোহাইড্রেট পৃথিবীর সবচেয়ে গবেষণালব্ধ স্পোর্টস সাপ্লিমেন্ট — শক্তি, পাওয়ার ও পেশির জন্য ৫০০+ গবেষণা। থ্রাইভেরটা মাইক্রোনাইজড, প্রতি ব্যাচে থার্ড-পার্টি ল্যাব-টেস্টেড, এবং QR-সিলড।",
    },
    ingredients: {
      en: "Creatine Monohydrate (5g per serving). That's it. No flavour in Unflavored; natural flavour + sucralose in Mango Ice and Watermelon Mojito.",
      bn: "ক্রিয়েটিন মনোহাইড্রেট (প্রতি সার্ভিং ৫g)। আনফ্লেভার্ডে কোনো ফ্লেভার নেই; ম্যাঙ্গো আইস ও ওয়াটারমেলনে প্রাকৃতিক ফ্লেভার।",
    },
    howToUse: {
      en: "Mix one scoop (5g) in 250ml water, once daily. Any time of day — consistency beats timing. No need to load. Drink plenty of water.",
      bn: "এক স্কুপ (৫g) ২৫০ml পানিতে মিশিয়ে প্রতিদিন একবার। দিনের যেকোনো সময়। প্রচুর পানি পান করুন।",
    },
    price: 1899,
    compareAt: 2200,
    servings: 60,
    rating: 4.9,
    reviewCount: 412,
    badges: ["bestseller", "lab_tested", "qr"],
    flavours: [
      { id: "mango-ice", name: { en: "Mango Ice", bn: "ম্যাঙ্গো আইস" }, inStock: true, stockCount: 38 },
      { id: "watermelon-mojito", name: { en: "Watermelon Mojito", bn: "ওয়াটারমেলন মোহিতো" }, inStock: true, stockCount: 7 },
      { id: "unflavored", name: { en: "Unflavored", bn: "আনফ্লেভার্ড" }, inStock: true, stockCount: 52 },
    ],
    images: [JAR_IMG, JAR_IMG_2],
    certificateUrl: "/science",
    bestseller: true,
    crossSell: ["thryve-shaker", "creatine-starter-stack"],
    subscriptionDiscount: 13,
  },
  {
    id: "thryve-shaker",
    slug: "thryve-shaker",
    name: "Thryve Shaker 600ml",
    category: "accessories",
    variantLabel: { en: "600ml · leak-proof" },
    shortDescription: {
      en: "Mixes clean, seals tight. The companion to every scoop.",
      bn: "পরিষ্কার মিক্স, ফিট সিল।",
    },
    about: { en: "600ml shaker with a stainless mixing ball. BPA-free, dishwasher-safe." },
    ingredients: { en: "—" },
    howToUse: { en: "Add liquid first, then powder. Shake 15 seconds." },
    price: 590,
    servings: 0,
    rating: 4.8,
    reviewCount: 96,
    badges: ["new"],
    flavours: [{ id: "default", name: { en: "Matte Black" }, inStock: true, stockCount: 120 }],
    images: [PLACEHOLDER],
    crossSell: ["creatine-monohydrate"],
  },
  {
    id: "thryve-gym-bag",
    slug: "thryve-gym-bag",
    name: "Thryve Gym Duffel",
    category: "accessories",
    variantLabel: { en: "40L · water-resistant" },
    shortDescription: { en: "Carry your stack. Shoe compartment, laptop sleeve." },
    about: { en: "40L duffel with separate shoe compartment and padded laptop sleeve." },
    ingredients: { en: "—" },
    howToUse: { en: "Wipe clean." },
    price: 1290,
    servings: 0,
    rating: 4.7,
    reviewCount: 41,
    badges: [],
    flavours: [{ id: "default", name: { en: "Charcoal" }, inStock: true, stockCount: 24 }],
    images: [PLACEHOLDER],
  },
  {
    id: "thryve-lifting-belt",
    slug: "thryve-lifting-belt",
    name: "Thryve Lifting Belt",
    category: "accessories",
    variantLabel: { en: "10mm · lever" },
    shortDescription: { en: "IPAF-style lever belt for heavy days. 10mm, full suede." },
    about: { en: "10mm lever belt, full suede construction, steel lever buckle." },
    ingredients: { en: "—" },
    howToUse: { en: "Snug at the navel under heavy loads." },
    price: 1890,
    servings: 0,
    rating: 4.9,
    reviewCount: 33,
    badges: [],
    flavours: [{ id: "default", name: { en: "Black" }, inStock: true, stockCount: 12 }],
    images: [PLACEHOLDER],
  },
  {
    id: "thryve-wrist-wraps",
    slug: "thryve-wrist-wraps",
    name: "Thryve Wrist Wraps",
    category: "accessories",
    variantLabel: { en: "Pair · 24 inch" },
    shortDescription: { en: "Lock in for pressing. Stiff, thumb-loop, pair." },
    about: { en: "24-inch stiff wraps with thumb loop. Sold as a pair." },
    ingredients: { en: "—" },
    howToUse: { en: "Wrap tight for bench/press, loose between sets." },
    price: 690,
    servings: 0,
    rating: 4.6,
    reviewCount: 58,
    badges: [],
    flavours: [{ id: "default", name: { en: "Black / Green" }, inStock: true, stockCount: 60 }],
    images: [PLACEHOLDER],
  },
  {
    id: "creatine-starter-stack",
    slug: "creatine-starter-stack",
    name: "Starter Stack",
    category: "creatine",
    variantLabel: { en: "Creatine + Shaker", bn: "ক্রিয়েটিন + শেকার" },
    shortDescription: {
      en: "Everything to start: a jar of Mango Ice Creatine + a Thryve Shaker. Save ৳200.",
      bn: "শুরু করার সব: ম্যাঙ্গো আইস ক্রিয়েটিন + শেকার। ৳২০০ সেভ।",
    },
    about: {
      en: "The complete intro to Thryve: one 60-serving jar of Mango Ice Creatine Monohydrate and a Thryve Shaker to mix it. Bundled so you save.",
    },
    ingredients: { en: "See Creatine Monohydrate." },
    howToUse: { en: "See Creatine Monohydrate." },
    price: 2290,
    compareAt: 2489,
    servings: 60,
    rating: 4.9,
    reviewCount: 88,
    badges: ["sale"],
    flavours: [{ id: "mango-ice", name: { en: "Mango Ice" }, inStock: true, stockCount: 30 }],
    images: [JAR_IMG],
    bundle: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
