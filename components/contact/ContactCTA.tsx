"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { HiOutlinePhone } from "react-icons/hi2";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "next-intl";
import { contactDetails } from "./contact-details";

export default function ContactCTA() {
  const t = useTranslations("ContactPage");
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-primary-dark py-20 sm:py-24 lg:py-28">
      <Container>
        <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: reduceMotion ? 0 : 0.6 }} className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-champagne sm:text-sm">{t("direct.eyebrow")}</p>
          <h2 className="mt-4 text-3xl leading-tight tracking-[-0.025em] text-ivory sm:text-5xl">{t("direct.title")}</h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-ivory/65">{t("direct.description")}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={`tel:${contactDetails.phone}`} className="inline-flex items-center gap-2 bg-ivory px-5 py-3.5 text-sm font-semibold text-primary-dark transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne">
              <HiOutlinePhone className="h-5 w-5" aria-hidden="true" />
              {t("direct.call")}
            </a>
            <a href={`https://wa.me/${contactDetails.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-ivory/30 px-5 py-3.5 text-sm font-semibold text-ivory transition-colors hover:bg-ivory/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne">
              <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
              {t("direct.whatsapp")}
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
