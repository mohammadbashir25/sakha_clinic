"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiMapPin, FiPhoneCall } from "react-icons/fi";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaYoutube,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { FooterData, FooterLinkGroup } from "./data";

interface FooterLinksProps {
  navigation: FooterLinkGroup;
  services: FooterLinkGroup;
  contact: FooterData["contact"];
}

const PLACEHOLDER = "[CLIENT INPUT REQUIRED]";

const SOCIAL_ICONS: Record<string, IconType> = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
  twitter: FaXTwitter,
  x: FaXTwitter,
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

function LinkGroup({ title, links }: FooterLinkGroup) {
  return (
    <motion.div variants={item}>
      <h3 className="text-sm font-medium text-[#FAF8F5]">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm text-[#F2EAF4]/70 transition-colors duration-200 hover:text-[#C96BD5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C96BD5]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function FooterLinks({
  navigation,
  services,
  contact,
}: FooterLinksProps) {
  const shouldReduceMotion = useReducedMotion();

  const hasPhone = contact.phone && contact.phone !== PLACEHOLDER;
  const hasWhatsapp = contact.whatsapp && contact.whatsapp !== PLACEHOLDER;
  const socialLinks = (contact.socialLinks ?? []).filter(
    (social) => social.href && social.href !== PLACEHOLDER
  );

  return (
    <motion.div
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={container}
      className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3"
    >
      <nav aria-label="Footer navigation">
        <LinkGroup {...navigation} />
      </nav>

      <LinkGroup {...services} />

      <motion.div variants={item} className="col-span-2 sm:col-span-1">
        <h3 className="text-sm font-medium text-[#FAF8F5]">Contact</h3>
        <ul className="mt-4 space-y-3">
          {hasPhone && (
            <li>
              <a
                href={`tel:${contact.phone}`}
                className="inline-flex items-center gap-2 text-sm text-[#F2EAF4]/70 transition-colors duration-200 hover:text-[#C96BD5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C96BD5]"
              >
                <FiPhoneCall className="h-4 w-4 shrink-0" aria-hidden="true" />
                {contact.phone}
              </a>
            </li>
          )}
          {hasWhatsapp && (
            <li>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#F2EAF4]/70 transition-colors duration-200 hover:text-[#C96BD5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C96BD5]"
              >
                <FaWhatsapp className="h-4 w-4 shrink-0" aria-hidden="true" />
                WhatsApp
              </a>
            </li>
          )}
          {contact.location && (
            <li className="flex items-start gap-2 text-sm text-[#F2EAF4]/70">
              <FiMapPin
                className="mt-0.5 h-4 w-4 shrink-0"
                aria-hidden="true"
              />
              <span>{contact.location}</span>
            </li>
          )}
        </ul>

        {socialLinks.length > 0 && (
          <ul className="mt-5 flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = SOCIAL_ICONS[social.label.toLowerCase()];
              return (
                <li key={social.href}>
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#F2EAF4]/20 text-[#FAF8F5] transition-colors duration-200 hover:border-[#C96BD5]/60 hover:text-[#C96BD5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C96BD5]"
                  >
                    {Icon ? (
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <span className="text-xs font-medium">
                        {social.label.charAt(0)}
                      </span>
                    )}
                  </motion.a>
                </li>
              );
            })}
          </ul>
        )}
      </motion.div>
    </motion.div>
  );
}
