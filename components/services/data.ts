/**
 * Static service metadata. No translated text lives here — all copy is in
 * messages under "ServicesPage". Slugs are language-neutral and never translated.
 */

export const serviceSlugs = [
  "hair-transplant",
  "beard-transplant",
  "eyebrow-transplant",
  "hair-loss-treatment",
  "prp-hair-face",
  "mesotherapy-hair-face",
  "mesogel",
  "biofiller",
  "botox",
  "lip-filler",
  "cheek-filler",
  "nose-filler",
  "under-eye-filler",
  "acne-treatment",
  "hydrafacial",
  "microneedling",
  "laser-hair-removal",
  "hr-sr-ipl",
  "fractional-co2-laser",
  "tattoo-removal-laser",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export const serviceCategories = [
  "hair",
  "aesthetics",
  "skin",
  "laser",
] as const;

export type ServiceCategory = (typeof serviceCategories)[number];

export type ServiceIconId =
  | "scissors"
  | "droplet"
  | "layers"
  | "user"
  | "eye"
  | "target"
  | "zap"
  | "sun"
  | "aperture"
  | "activity";

export interface ServiceDef {
  key: string;
  slug: ServiceSlug;
  category: ServiceCategory;
  icon: ServiceIconId;
  /** Path inside the "ServicesPage" namespace. */
  translationKey: string;
  related: readonly ServiceSlug[];
}

export const services: readonly ServiceDef[] = [
  { key: "hairTransplant", slug: "hair-transplant", category: "hair", icon: "scissors", translationKey: "services.hairTransplant", related: ["beard-transplant", "eyebrow-transplant", "hair-loss-treatment"] },
  { key: "beardTransplant", slug: "beard-transplant", category: "hair", icon: "scissors", translationKey: "services.beardTransplant", related: ["hair-transplant", "eyebrow-transplant"] },
  { key: "eyebrowTransplant", slug: "eyebrow-transplant", category: "hair", icon: "eye", translationKey: "services.eyebrowTransplant", related: ["hair-transplant", "beard-transplant"] },
  { key: "hairLossTreatment", slug: "hair-loss-treatment", category: "hair", icon: "activity", translationKey: "services.hairLossTreatment", related: ["prp-hair-face", "mesotherapy-hair-face", "hair-transplant"] },
  { key: "prpHairFace", slug: "prp-hair-face", category: "hair", icon: "droplet", translationKey: "services.prpHairFace", related: ["mesotherapy-hair-face", "hair-loss-treatment", "hair-transplant"] },
  { key: "mesotherapyHairFace", slug: "mesotherapy-hair-face", category: "hair", icon: "droplet", translationKey: "services.mesotherapyHairFace", related: ["prp-hair-face", "hair-loss-treatment"] },
  { key: "mesogel", slug: "mesogel", category: "aesthetics", icon: "layers", translationKey: "services.mesogel", related: ["mesotherapy-hair-face", "biofiller"] },
  { key: "biofiller", slug: "biofiller", category: "aesthetics", icon: "layers", translationKey: "services.biofiller", related: ["mesogel", "cheek-filler", "lip-filler"] },
  { key: "botox", slug: "botox", category: "aesthetics", icon: "aperture", translationKey: "services.botox", related: ["lip-filler", "cheek-filler", "biofiller"] },
  { key: "lipFiller", slug: "lip-filler", category: "aesthetics", icon: "droplet", translationKey: "services.lipFiller", related: ["cheek-filler", "nose-filler", "botox"] },
  { key: "cheekFiller", slug: "cheek-filler", category: "aesthetics", icon: "user", translationKey: "services.cheekFiller", related: ["lip-filler", "under-eye-filler", "botox"] },
  { key: "noseFiller", slug: "nose-filler", category: "aesthetics", icon: "user", translationKey: "services.noseFiller", related: ["lip-filler", "cheek-filler", "under-eye-filler"] },
  { key: "underEyeFiller", slug: "under-eye-filler", category: "aesthetics", icon: "eye", translationKey: "services.underEyeFiller", related: ["cheek-filler", "nose-filler", "botox"] },
  { key: "acneTreatment", slug: "acne-treatment", category: "skin", icon: "target", translationKey: "services.acneTreatment", related: ["microneedling", "hydrafacial", "fractional-co2-laser"] },
  { key: "hydrafacial", slug: "hydrafacial", category: "skin", icon: "droplet", translationKey: "services.hydrafacial", related: ["microneedling", "acne-treatment"] },
  { key: "microneedling", slug: "microneedling", category: "skin", icon: "target", translationKey: "services.microneedling", related: ["acne-treatment", "hydrafacial", "fractional-co2-laser"] },
  { key: "laserHairRemoval", slug: "laser-hair-removal", category: "laser", icon: "zap", translationKey: "services.laserHairRemoval", related: ["hr-sr-ipl", "fractional-co2-laser", "tattoo-removal-laser"] },
  { key: "hrSrIpl", slug: "hr-sr-ipl", category: "laser", icon: "sun", translationKey: "services.hrSrIpl", related: ["laser-hair-removal", "fractional-co2-laser", "tattoo-removal-laser"] },
  { key: "fractionalCo2Laser", slug: "fractional-co2-laser", category: "laser", icon: "aperture", translationKey: "services.fractionalCo2Laser", related: ["acne-treatment", "microneedling", "hr-sr-ipl"] },
  { key: "tattooRemovalLaser", slug: "tattoo-removal-laser", category: "laser", icon: "zap", translationKey: "services.tattooRemovalLaser", related: ["laser-hair-removal", "hr-sr-ipl", "fractional-co2-laser"] },
];

/** Appointment destination. Change this one value if you use another route. */
export const servicesLinks = {
  appointment: "/contact",
  index: "/services",
} as const;

export function getServiceBySlug(slug: string): ServiceDef | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServiceNumber(slug: string): string {
  const index = services.findIndex((service) => service.slug === slug);
  return String(index + 1).padStart(2, "0");
}

export function countByCategory(category: ServiceCategory): number {
  return services.filter((service) => service.category === category).length;
}