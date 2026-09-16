export interface ServiceImage {
  /** Leave unset until real service photography is supplied — ServiceCard falls back to ImagePlaceholder. */
  src?: string;
  alt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  href: string;
  image: ServiceImage;
}

export interface SignatureServicesData {
  eyebrow: string;
  heading: string;
  description: string;
  services: ServiceItem[];
}

export const signatureServicesData: SignatureServicesData = {
  eyebrow: "Signature Services",
  heading: "Care designed around your goals.",
  description:
    "Explore Sakha's core areas of care, from hair restoration and dermatology to skin and aesthetic treatments.",
  services: [
    {
      id: "hair-transplant",
      title: "Hair Transplant",
      description:
        "Personalized hair restoration focused on a natural-looking appearance and an approach suited to your individual goals.",
      href: "/services/hair-transplant",
      image: {
        alt: "A hair restoration consultation at the Sakha clinic",
      },
    },
    {
      id: "dermatology",
      title: "Dermatology",
      description:
        "Professional dermatological care for a range of skin and hair concerns, guided by individual assessment.",
      href: "/services/dermatology",
      image: {
        alt: "A dermatology assessment room at the Sakha clinic",
      },
    },
    {
      id: "skin-treatments",
      title: "Skin Treatments",
      description: "Thoughtful treatments focused on skin appearance, texture, and overall care.",
      href: "/services/skin-treatments",
      image: {
        alt: "A skin treatment in progress at the Sakha clinic",
      },
    },
    {
      id: "aesthetic-treatments",
      title: "Aesthetic Treatments",
      description:
        "A curated approach to aesthetic care designed around your preferences and treatment goals.",
      href: "/services/aesthetic-treatments",
      image: {
        alt: "An aesthetic treatment consultation at the Sakha clinic",
      },
    },
  ],
};
