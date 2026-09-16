/**
 * Canonical contact details for Sakha.
 *
 * This is the single place these values live — ContactInfo, ContactCTA,
 * and Location all read from here instead of hardcoding phone/WhatsApp/
 * address strings themselves, so there is only ever one place to update
 * once the clinic supplies real details.
 *
 * Every field is `null` until the clinic confirms it. Do not fill in a
 * placeholder-looking value "to be safe" — components are written to
 * handle `null` gracefully with a clear [CLIENT INPUT REQUIRED] state.
 */
export interface SocialLink {
  label: string;
  href: string;
}

export interface ContactDetails {
  /** E.164-style value for use in tel: links, e.g. "+93700000000". */
  phone: string | null;
  /** Human-readable phone for display. */
  phoneDisplay: string | null;
  /** Digits only (with country code, no symbols) for wa.me links. */
  whatsappNumber: string | null;
  /** Human-readable WhatsApp number for display. */
  whatsappDisplay: string | null;
  city: string;
  exactAddress: string | null;
  hours: string | null;
  socialLinks: SocialLink[];
}

export const contactDetails: ContactDetails = {
  phone: null,
  phoneDisplay: null,
  whatsappNumber: null,
  whatsappDisplay: null,
  city: "Mazar-e-Sharif, Afghanistan",
  exactAddress: null,
  hours: null,
  socialLinks: [],
};