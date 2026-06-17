export const site = {
  name: "Thryve",
  tagline: { en: "become unstoppable.", bn: "অপ্রতিরোধ্য হয়ে ওঠো।" } as const,
  email: "hello@thryvebd.com",
  // TODO(client): replace placeholder WhatsApp number with real Thryve line.
  whatsapp: "8801790000000",
  whatsappDisplay: "+880 1790-000000",
  address: { en: "Banani, Dhaka 1213, Bangladesh", bn: "বনানী, ঢাকা ১২১৩, বাংলাদেশ" } as const,
  social: {
    instagram: "https://instagram.com/thryvebd",
    facebook: "https://facebook.com/thryvebd",
    youtube: "",
  },
  payments: ["bKash", "Nagad", "Visa", "Mastercard", "COD"] as const,
  stats: [
    { id: "customers", value: "2,000+", label: { en: "athletes powered", bn: "অ্যাথলেট" } },
    { id: "areas", value: "689", label: { en: "delivery areas", bn: "ডেলিভারি এরিয়া" } },
    { id: "rating", value: "4.9★", label: { en: "average rating", bn: "গড় রেটিং" } },
  ],
  // Free-delivery threshold in BDT
  freeDeliveryThreshold: 2500,
  // Average order value baseline (from brief §11)
  aovBaseline: 2175,
} as const;

export type Site = typeof site;
