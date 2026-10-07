"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  HiOutlineArrowDown,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "next-intl";

export default function ContactHero() {
  const t = useTranslations("ContactPage");
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ivory py-12 sm:py-14 lg:py-16">
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      >
        <div className="absolute -right-20 top-0 h-56 w-56 rounded-full border border-champagne/30" />
        <div className="absolute -right-6 top-14 h-40 w-40 rounded-full border border-primary/10" />
        <div className="absolute bottom-0 left-0 h-px w-2/3 bg-primary/10" />
      </div>

      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Content */}
          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              ease: "easeOut",
            }}
            className="relative z-10 max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne sm:text-sm">
              {t("hero.eyebrow")}
            </p>

            <h1 className="mt-3 max-w-xl text-4xl leading-[1.08] tracking-[-0.03em] text-charcoal sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base">
              {t("hero.description")}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#consultation-form"
                className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
              >
                <HiOutlineChatBubbleLeftRight
                  className="h-5 w-5"
                  aria-hidden="true"
                />
                {t("consultation.submit")}
              </a>

              <a
                href="#contact-details"
                className="inline-flex items-center gap-2 border border-primary/20 bg-white/60 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
              >
                {t("hero.viewContact")}

                <HiOutlineArrowDown
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </a>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{
              opacity: 0,
              scale: reduceMotion ? 1 : 0.97,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              ease: "easeOut",
              delay: 0.05,
            }}
            className="relative mx-auto hidden w-full max-w-sm lg:block"
            aria-hidden="true"
          >
            <div className="relative aspect-[5/4] overflow-hidden border border-primary/10 bg-lavender">
              <div className="absolute inset-5 border border-champagne/35" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-champagne/50 bg-ivory shadow-[0_16px_45px_rgba(50,1,84,0.07)]">
                  <div className="absolute inset-4 rounded-full border border-primary/10" />

                  <HiOutlineChatBubbleLeftRight
                    className="h-12 w-12 text-primary"
                    strokeWidth={1}
                  />
                </div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between border-t border-primary/10 pt-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                  SAKHA
                </span>

                <span className="text-xs text-muted">
                  {t("hero.visualLabel")}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}