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
      bn: "থ্রাইভ প্রমাণ করতে এসেছে যে বিশ্বমানের সাপ্লিমেন্ট দেশেই তৈরি হতে পারে।",
    },
    image: JAR,
    stat: { value: "100%", label: { en: "Made in Bangladesh" } },
  },
  {
    id: "mission",
    kicker: { en: "Chapter 02" },
    title: { en: "Built for the ones who refuse average.", bn: "মাঝারি মানে না, তাদের জন্য।" },
    body: {
      en: "We started Thryve for the Bangladeshi athlete who trains hard and deserves clean, effective fuel — not hype, not fillers, not mystery blends.",
    },
    stat: { value: "5g", label: { en: "creatine per serving — no fillers" } },
  },
  {
    id: "why-creatine",
    kicker: { en: "Chapter 03" },
    title: { en: "Why creatine first." },
    body: {
      en: "It is the most researched supplement on earth — 500+ studies back it for strength, power, and lean mass. The honest place to start. So we started there.",
    },
    stat: { value: "500+", label: { en: "studies behind creatine" } },
  },
  {
    id: "ambition",
    kicker: { en: "Chapter 04" },
    title: { en: "The local hero, going further." },
    body: {
      en: "Creatine today. Pre-Workout (Katana), Activewear, and Whey tomorrow. The ambition is a full Bangladeshi performance brand — built to sit beside the best in the world.",
    },
  },
];
