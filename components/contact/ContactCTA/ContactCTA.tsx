"use client";

import { motion } from "framer-motion";
import { HiOutlinePhone } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import {Container} from "@/components/ui/Container";
import { contactCTAData } from "./data";
import { contactDetails } from "../contact-details";

export default function ContactCTA() {
  const hasPhone = Boolean(contactDetails.phone);
  const hasWhatsapp = Boolean(contactDetails.whatsappNumber);

  return (
    <section className="bg-primary-dark py-20 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl leading-tight text-ivory sm:text-4xl">
            {contactCTAData.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ivory/70">
            {contactCTAData.description}
          </p>

          {hasPhone || hasWhatsapp ? (
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              {hasPhone && (
                <a
                  href={`tel:${contactDetails.phone}`}
                  className="flex items-center gap-2 bg-ivory px-6 py-3.5 text-sm font-medium text-primary-dark transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-orchid"
                >
                  <HiOutlinePhone className="h-4 w-4" aria-hidden="true" />
                  {contactCTAData.callLabel}
                </a>
              )}
              {hasWhatsapp && (
                <a
                  href={`https://wa.me/${contactDetails.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-ivory/40 px-6 py-3.5 text-sm font-medium text-ivory transition-colors hover:bg-ivory/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-orchid"
                >
                  <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                  {contactCTAData.whatsappLabel}
                </a>
              )}
            </div>
          ) : (
            <p className="mt-9 text-sm text-ivory/60 italic">
              Phone and WhatsApp — [CLIENT INPUT REQUIRED]
            </p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}