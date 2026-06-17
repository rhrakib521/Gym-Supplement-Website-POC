"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isValidBdPhone } from "@/lib/format";

export function ExitIntent() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("thryve-exit")) return;

    let armed = true;
    const trigger = () => {
      if (!armed) return;
      armed = false;
      sessionStorage.setItem("thryve-exit", "1");
      setOpen(true);
      document.removeEventListener("mouseout", onOut);
    };
    const onOut = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    const timer = setTimeout(trigger, 60000); // mobile fallback

    document.addEventListener("mouseout", onOut);
    return () => {
      document.removeEventListener("mouseout", onOut);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.div
            className="noise relative w-full max-w-md rounded-3xl border border-line bg-bg p-8 text-center"
            initial={{ y: 20, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 text-ink-dim hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-green/15">
              <Gift className="h-6 w-6 text-green" />
            </div>
            <h2 className="mt-4 font-display text-2xl font-semibold">Wait — ৳150 off.</h2>
            <p className="mt-2 text-sm text-ink-dim">
              Drop your number and we&apos;ll WhatsApp you a code for ৳150 off your first jar.
            </p>
            {done ? (
              <p className="mt-5 text-sm text-green">Done — check WhatsApp for your code.</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (isValidBdPhone(phone)) setDone(true);
                }}
                className="mt-5 flex flex-col gap-2"
              >
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  className="h-11 w-full rounded-[10px] border border-line bg-surface-1 px-3 text-center text-sm outline-none focus:border-green"
                />
                <Button type="submit" className="w-full">Get my ৳150 code</Button>
              </form>
            )}
            <button onClick={() => setOpen(false)} className="mt-3 text-xs text-ink-dim hover:text-ink">
              No thanks
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
