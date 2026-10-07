"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from "react-icons/hi2";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "next-intl";
import { contactDetails } from "./contact-details";

export default function ContactInfo() {
  const t = useTranslations("ContactPage");
  const reduceMotion = useReducedMotion();

  const items = [
    {
      label: t("contactInfo.phone"),
      value: contactDetails.phoneDisplay,
      href: `tel:${contactDetails.phone}`,
      icon: HiOutlinePhone,
      external: false,
    },
    {
      label: t("contactInfo.whatsapp"),
      value: contactDetails.whatsappDisplay,
      href: `https://wa.me/${contactDetails.whatsappNumber}`,
      icon: FaWhatsapp,
      external: true,
    },
    {
      label: t("contactInfo.email"),
      value: contactDetails.email,
      href: `mailto:${contactDetails.email}`,
      icon: HiOutlineEnvelope,
      external: false,
    },
    {
      label: t("contactInfo.location"),
      value: contactDetails.city,
      href: contactDetails.mapUrl,
      icon: HiOutlineMapPin,
      external: true,
    },
  ];

  return (
    <section id="contact-details" className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-champagne sm:text-sm">
              {t("contactInfo.eyebrow")}
            </p>
            <h2 className="mt-4 text-3xl leading-tight tracking-[-0.025em] text-charcoal sm:text-4xl">
              {t("contactInfo.title")}
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              {t("contactInfo.description")}
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            className="grid border-t border-charcoal/10 sm:grid-cols-2"
          >
            {items.map(({ label, value, href, icon: Icon, external }) => (
              <motion.a
                key={label}
                variants={{
                  hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group flex min-h-40 flex-col justify-between border-b border-charcoal/10 py-6 sm:min-h-44 sm:px-7 first:sm:border-r"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    {label}
                  </span>
                  <Icon className="h-5 w-5 text-primary transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
                </div>
                <span className="mt-8 break-words text-lg text-charcoal underline-offset-4 group-hover:underline">
                  {value}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
