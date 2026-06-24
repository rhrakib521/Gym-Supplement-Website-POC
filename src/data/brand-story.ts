import type { StoryChapter } from "@/types";

const JAR =
  "https://res.cloudinary.com/ddope55xr/image/upload/v1751739019/WEB_1_by9uon.webp";

export const brandStory: StoryChapter[] = [
  {
    id: "made-in-bd",
    kicker: { en: "Chapter 01" },
    title: { en: "Made in Bangladesh.", bn: "বাংলাদেশে তৈরি।" },
    body: {
      en: "Thryve was born to prove a world-class supplement can be made at home — lab-tested, honestly dosed, sealed with a QR — not imported and marked up.",
      bn: "থ্রাইভ প্রমাণ করতে এসেছে যে বিশ্বমানের সাপ্লিমেন্ট দেশেই তৈরি হতে পারে — ল্যাব-টেস্টেড, সততার সাথে ডোজড, QR-সিলড — আমদানি করে দাম বাড়ানো নয়।",
    },
    image: JAR,
    stat: { value: "100%", label: { en: "Made in Bangladesh", bn: "বাংলাদেশে তৈরি" } },
  },
  {
    id: "mission",
    kicker: { en: "Chapter 02" },
    title: { en: "Built for the ones who refuse average.", bn: "মাঝারি মানে না, তাদের জন্য।" },
    body: {
      en: "We started Thryve for the Bangladeshi athlete who trains hard and deserves clean, effective fuel — not hype, not fillers, not mystery blends.",
      bn: "আমরা থ্রাইভ শুরু করেছি সেই বাংলাদেশি অ্যাথলিটের জন্য যে কঠোর পরিশ্রম করে এবং পরিষ্কার, কার্যকর ফুয়েল পাওয়ার যোগ্য — হাইপ নয়, ফিলার নয়, রহস্যময় ব্লেন্ড নয়।",
    },
    stat: { value: "5g", label: { en: "creatine per serving — no fillers", bn: "প্রতি সার্ভিং ক্রিয়েটিন — কোনো ফিলার নেই" } },
  },
  {
    id: "why-creatine",
    kicker: { en: "Chapter 03" },
    title: { en: "Why creatine first.", bn: "কেন আগে ক্রিয়েটিন।" },
    body: {
      en: "It is the most researched supplement on earth — 500+ studies back it for strength, power, and lean mass. The honest place to start. So we started there.",
      bn: "এটি পৃথিবীর সবচেয়ে গবেষণালব্ধ সাপ্লিমেন্ট — শক্তি, পাওয়ার ও পেশির জন্য ৫০০+ গবেষণা। সততার সাথে শুরু করার জায়গা। তাই আমরা সেখান থেকেই শুরু করেছি।",
    },
    stat: { value: "500+", label: { en: "studies behind creatine", bn: "ক্রিয়েটিনের পেছনে গবেষণা" } },
  },
  {
    id: "ambition",
    kicker: { en: "Chapter 04" },
    title: { en: "The local hero, going further.", bn: "লোকাল হিরো, আরও দূরে।" },
    body: {
      en: "Creatine today. Pre-Workout (Katana), Activewear, and Whey tomorrow. The ambition is a full Bangladeshi performance brand — built to sit beside the best in the world.",
      bn: "আজ ক্রিয়েটিন। আগামীকাল প্রি-ওয়ার্কআউট (কাতানা), অ্যাক্টিভওয়্যার ও হুই। লক্ষ্য একটি সম্পূর্ণ বাংলাদেশি পারফরম্যান্স ব্র্যান্ড — বিশ্বের সেরাদের পাশে দাঁড়ানোর জন্য তৈরি।",
    },
  },
];
