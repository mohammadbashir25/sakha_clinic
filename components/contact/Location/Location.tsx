"use client";

import { motion } from "framer-motion";
import { HiOutlineMapPin, HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import {Container} from "@/components/ui/Container";
import { locationData } from "./data";
import { contactDetails } from "../contact-details";

export default function Location() {
  const hasAddress = Boolean(contactDetails.exactAddress);
  const directionsHref = hasAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${contactDetails.exactAddress}, ${contactDetails.city}`
      )}`
    : null;

  return (
    <section className="bg-lavender/40 py-20 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-medium uppercase tracking-[0.18em] text-champagne">
            {locationData.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl leading-tight text-charcoal sm:text-4xl">
            {locationData.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {locationData.description}
          </p>
        </motion.div>

        <div className="mx-auto mt-12 flex aspect-[16/9] max-w-4xl flex-col items-center justify-center gap-4 border border-muted/25 bg-ivory px-6 text-center">
          <HiOutlineMapPin className="h-8 w-8 text-primary" aria-hidden="true" />
          {hasAddress ? (
            <address className="not-italic text-base text-charcoal">
              {contactDetails.exactAddress}
              <br />
              {contactDetails.city}
            </address>
          ) : (
            <p className="text-base text-muted/70 italic">
              {contactDetails.city}
              <br />
              Exact address — [CLIENT INPUT REQUIRED]
            </p>
          )}

          {directionsHref && (
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
            >
              Get Directions
              <HiOutlineArrowTopRightOnSquare className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </Container>
    </section>
  );
}