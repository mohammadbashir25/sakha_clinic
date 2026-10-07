"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineArrowTopRightOnSquare, HiOutlineMapPin } from "react-icons/hi2";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "next-intl";
import { contactDetails } from "./contact-details";

export default function Location() {
  const t = useTranslations("ContactPage");
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-ivory py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid items-stretch gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduceMotion ? 0 : 0.6 }}
            className="flex flex-col justify-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-champagne sm:text-sm">
              {t("location.eyebrow")}
            </p>
            <h2 className="mt-4 text-3xl leading-tight tracking-[-0.025em] text-charcoal sm:text-4xl">
              {t("location.title")}
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              {t("location.description")}
            </p>
            <address className="mt-8 border-s-2 border-champagne ps-5 not-italic text-sm leading-7 text-charcoal">
              {contactDetails.exactAddress}
              <br />
              {contactDetails.city}
            </address>
            <a href={contactDetails.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex w-fit items-center gap-2 bg-primary px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid">
              {t("location.openMap")}
              <HiOutlineArrowTopRightOnSquare className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduceMotion ? 0 : 0.7 }}
            className="relative min-h-[360px] overflow-hidden border border-primary/15 bg-lavender"
            aria-label={t("location.visualLabel")}
          >
            <div className="absolute inset-0 opacity-50" aria-hidden="true">
              <div className="absolute left-[12%] top-[24%] h-px w-[72%] rotate-12 bg-primary/20" />
              <div className="absolute left-[20%] top-[48%] h-px w-[68%] -rotate-6 bg-primary/15" />
              <div className="absolute left-[35%] top-[20%] h-[65%] w-px rotate-[18deg] bg-primary/10" />
              <div className="absolute left-[62%] top-[8%] h-[82%] w-px -rotate-[12deg] bg-champagne/25" />
              <div className="absolute left-[18%] top-[62%] h-24 w-24 rounded-full border border-primary/10" />
              <div className="absolute right-[12%] bottom-[12%] h-40 w-40 rounded-full border border-champagne/20" />
            </div>
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-champagne bg-ivory shadow-[0_12px_40px_rgba(50,1,84,0.12)]">
                <HiOutlineMapPin className="h-7 w-7 text-primary" aria-hidden="true" />
              </div>
              <span className="mt-4 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Mazar-e-Sharif
              </span>
            </div>
            <span className="absolute bottom-5 start-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
              36.718° N · 67.114° E
            </span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
