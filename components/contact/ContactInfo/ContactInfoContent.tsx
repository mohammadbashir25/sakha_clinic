"use client";

import { motion } from "framer-motion";
import {
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineClock,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";
import type { ContactInfoData } from "./data";
import { contactDetails } from "../contact-details";

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function ContactInfoContent({ data }: { data: ContactInfoData }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl leading-tight text-charcoal sm:text-3xl">
          {data.heading}
        </h2>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
          {data.description}
        </p>
      </motion.div>

      <motion.ul variants={listVariants} className="mt-8 flex flex-col gap-5">
        <motion.li variants={itemVariants} className="flex items-start gap-3">
          <HiOutlinePhone
            className="mt-0.5 h-5 w-5 shrink-0 text-primary"
            aria-hidden="true"
          />
          {contactDetails.phone ? (
            <a
              href={`tel:${contactDetails.phone}`}
              className="text-base text-charcoal underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
            >
              {contactDetails.phoneDisplay ?? contactDetails.phone}
            </a>
          ) : (
            <span className="text-base text-muted/70 italic">
              Phone — [CLIENT INPUT REQUIRED]
            </span>
          )}
        </motion.li>

        <motion.li variants={itemVariants} className="flex items-start gap-3">
          <FaWhatsapp
            className="mt-0.5 h-5 w-5 shrink-0 text-primary"
            aria-hidden="true"
          />
          {contactDetails.whatsappNumber ? (
            <a
              href={`https://wa.me/${contactDetails.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-charcoal underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
            >
              {contactDetails.whatsappDisplay ?? contactDetails.whatsappNumber}
            </a>
          ) : (
            <span className="text-base text-muted/70 italic">
              WhatsApp — [CLIENT INPUT REQUIRED]
            </span>
          )}
        </motion.li>

        <motion.li variants={itemVariants} className="flex items-start gap-3">
          <HiOutlineMapPin
            className="mt-0.5 h-5 w-5 shrink-0 text-primary"
            aria-hidden="true"
          />
          <span className="text-base text-charcoal">
            {contactDetails.exactAddress ?? (
              <>
                {contactDetails.city}
                <span className="block text-sm text-muted/70 italic">
                  Exact address — [CLIENT INPUT REQUIRED]
                </span>
              </>
            )}
          </span>
        </motion.li>

        {contactDetails.hours && (
          <motion.li variants={itemVariants} className="flex items-start gap-3">
            <HiOutlineClock
              className="mt-0.5 h-5 w-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <span className="text-base text-charcoal">{contactDetails.hours}</span>
          </motion.li>
        )}
      </motion.ul>

      {contactDetails.socialLinks.length > 0 && (
        <motion.div variants={itemVariants} className="mt-8 flex gap-4">
          {contactDetails.socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}