export type ServiceCategoryIcon =
  | "scissors"
  | "beaker"
  | "sparkles"
  | "faceSmile";

export interface ServiceCategory {
  id: string;
  icon: ServiceCategoryIcon;
  title: string;
  description: string;
  href: string;
}

export const serviceCategoriesData: ServiceCategory[] = [
  {
    id: "hair-transplant",
    icon: "scissors",
    title: "Hair Transplant",
    description:
      "Personalized hair restoration designed around your goals and natural-looking appearance.",
    href: "#hair-transplant",
  },
  {
    id: "dermatology",
    icon: "beaker",
    title: "Dermatology",
    description:
      "Professional care for a range of skin and hair concerns based on individual assessment.",
    href: "#dermatology",
  },
  {
    id: "skin-treatments",
    icon: "sparkles",
    title: "Skin Treatments",
    description:
      "Focused treatments for skin appearance, texture, tone, and overall care.",
    href: "#skin-treatments",
  },
  {
    id: "aesthetic-treatments",
    icon: "faceSmile",
    title: "Aesthetic Treatments",
    description:
      "A considered approach to aesthetic treatments designed around your preferences.",
    href: "#aesthetic-treatments",
  },
];