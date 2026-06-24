"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FlaskConical, ShieldCheck, QrCode, Truck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-12%] h-[440px] w-[860px] max-w-[120vw] -translate-x-1/2 rounded-full bg-green/10 blur-[130px]" />
        <div className="absolute right-[5%] top-[10%] h-72 w-72 rounded-full bg-volt/10 blur-[120px]" />
      </div>

      <Container className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-28">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface-1 px-3 py-1.5 text-xs text-ink-dim">
            <span className="h-1.5 w-1.5 rounded-full bg-green" />
            {t("hero.eyebrow")}
          </p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-balance text-[clamp(3rem,9vw,7rem)] font-bold leading-[0.9] tracking-[-0.03em]"
          >
            {t("hero.title1")}
            <br />
            <span className="text-green">
              {t("hero.title2")}
              <span className="mt-1 block h-1 w-16 rounded-full bg-volt" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="text-pretty mt-7 max-w-md text-lg text-ink-dim"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button href="/creatine" size="lg">
              {t("hero.ctaShop")}
            </Button>
            <Button href="/verify" variant="outline" size="lg">
              <QrCode className="h-4 w-4" /> {t("hero.ctaVerify")}
            </Button>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            <Chip icon={FlaskConical}>{t("trust.labTested")}</Chip>
            <Chip icon={ShieldCheck}>{t("trust.gmp")}</Chip>
            <Chip icon={QrCode}>{t("trust.authentic")}</Chip>
            <Chip icon={Truck}>{t("trust.cod")}</Chip>
          </div>
        </div>

        <motion.div style={{ y }} className="relative">
          <div className="noise relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface-1">
            <img
              src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80"
              alt="Bangladeshi athlete training"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />
          </div>

          <div className="absolute -bottom-5 -left-3 hidden w-48 rounded-2xl border border-line bg-bg/90 p-3 shadow-xl shadow-black/40 backdrop-blur-md sm:block sm:-left-6">
            <div className="flex items-center gap-3">
              <img
                src="https://res.cloudinary.com/ddope55xr/image/upload/v1751739019/WEB_1_by9uon.webp"
                alt=""
                className="h-12 w-12 rounded-lg bg-surface-2 object-contain p-1"
              />
              <div>
                <p className="text-xs font-medium text-ink">Creatine Mono.</p>
                <p className="text-xs text-ink-dim">60 servings · ৳1,899</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-2 top-6 hidden rounded-full border border-line bg-bg/90 px-3 py-2 text-xs backdrop-blur-md sm:block sm:-right-4">
            <span className="text-amber">★ 4.9</span>{" "}
            <span className="text-ink-dim">· 412 reviews</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
