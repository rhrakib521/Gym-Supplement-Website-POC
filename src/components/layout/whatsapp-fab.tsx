"use client";

import { MessageCircle } from "lucide-react";
import { site } from "@/data/site";

export function WhatsAppFab() {
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hi Thryve! I'd like ৳100 off my first order.",
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-green p-4 text-black shadow-lg shadow-green/20 transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="pointer-events-none max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[160px] group-hover:opacity-100">
        Chat · ৳100 off
      </span>
      <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-green opacity-20" />
    </a>
  );
}
