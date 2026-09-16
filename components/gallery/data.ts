export type GalleryCategory =
  | "All"
  | "Clinic"
  | "Hair Transplant"
  | "Dermatology"
  | "Skin"
  | "Aesthetic"
  | "Before & After";

export const filterCategories: GalleryCategory[] = [
  "All",
  "Clinic",
  "Hair Transplant",
  "Dermatology",
  "Skin",
  "Aesthetic",
  "Before & After",
];

export type GallerySize = "large" | "wide" | "tall" | "regular";

interface GalleryItemBase {
  id: string;
  category: Exclude<GalleryCategory, "All">;
  title: string;
  caption: string;
  size: GallerySize;
  aspectRatio: string;
}

export interface GalleryImageItem extends GalleryItemBase {
  type: "image";
  imageLabel: string;
  alt: string;
}

export interface GalleryBeforeAfterItem extends GalleryItemBase {
  type: "before-after";
  category: "Before & After";
  beforeLabel: string;
  beforeAlt: string;
  afterLabel: string;
  afterAlt: string;
  note?: string;
}

export type GalleryItem = GalleryImageItem | GalleryBeforeAfterItem;

export const galleryItems: GalleryItem[] = [
  {
    id: "clinic-reception",
    type: "image",
    category: "Clinic",
    title: "Reception",
    caption: "The reception at Sakha's Mazar-e-Sharif clinic.",
    size: "large",
    aspectRatio: "4/5",
    imageLabel: "Clinic reception — [CLIENT INPUT REQUIRED: real photography]",
    alt: "Reception area at Sakha Hair Transplant, Dermatology & Beauty Center",
  },
  {
    id: "clinic-corridor",
    type: "image",
    category: "Clinic",
    title: "Clinic interior",
    caption: "A view of the clinic's treatment floor.",
    size: "regular",
    aspectRatio: "1/1",
    imageLabel: "Clinic corridor — [CLIENT INPUT REQUIRED: real photography]",
    alt: "Interior corridor at Sakha clinic",
  },
  {
    id: "hair-transplant-room",
    type: "image",
    category: "Hair Transplant",
    title: "Hair transplant room",
    caption: "The treatment room prepared for a hair transplant session.",
    size: "wide",
    aspectRatio: "16/9",
    imageLabel: "Hair transplant treatment room — [CLIENT INPUT REQUIRED: real photography]",
    alt: "Hair transplant treatment room at Sakha",
  },
  {
    id: "hair-transplant-detail",
    type: "image",
    category: "Hair Transplant",
    title: "Hair transplant, detail",
    caption: "Instruments prepared ahead of a session.",
    size: "tall",
    aspectRatio: "4/5",
    imageLabel: "Hair transplant instruments — [CLIENT INPUT REQUIRED: real photography]",
    alt: "Hair transplant instruments laid out at Sakha",
  },
  {
    id: "dermatology-consult",
    type: "image",
    category: "Dermatology",
    title: "Dermatology consultation",
    caption: "A dermatology consultation in progress.",
    size: "regular",
    aspectRatio: "1/1",
    imageLabel: "Dermatology consultation — [CLIENT INPUT REQUIRED: real photography]",
    alt: "Dermatology consultation room at Sakha",
  },
  {
    id: "dermatology-tools",
    type: "image",
    category: "Dermatology",
    title: "Dermatology, detail",
    caption: "Equipment used during dermatology assessments.",
    size: "regular",
    aspectRatio: "3/2",
    imageLabel: "Dermatology equipment — [CLIENT INPUT REQUIRED: real photography]",
    alt: "Dermatology equipment at Sakha",
  },
  {
    id: "skin-treatment-room",
    type: "image",
    category: "Skin",
    title: "Skin treatment room",
    caption: "A skin treatment room set up ahead of a session.",
    size: "large",
    aspectRatio: "4/5",
    imageLabel: "Skin treatment room — [CLIENT INPUT REQUIRED: real photography]",
    alt: "Skin treatment room at Sakha",
  },
  {
    id: "skin-treatment-detail",
    type: "image",
    category: "Skin",
    title: "Skin treatment, detail",
    caption: "Products used during skin treatments.",
    size: "regular",
    aspectRatio: "1/1",
    imageLabel: "Skin treatment products — [CLIENT INPUT REQUIRED: real photography]",
    alt: "Skin treatment products at Sakha",
  },
  {
    id: "aesthetic-consult",
    type: "image",
    category: "Aesthetic",
    title: "Aesthetic consultation",
    caption: "An aesthetic treatment consultation at Sakha.",
    size: "wide",
    aspectRatio: "16/9",
    imageLabel: "Aesthetic consultation — [CLIENT INPUT REQUIRED: real photography]",
    alt: "Aesthetic treatment consultation room at Sakha",
  },
  {
    id: "aesthetic-detail",
    type: "image",
    category: "Aesthetic",
    title: "Aesthetic, detail",
    caption: "A closer look at the aesthetic treatment environment.",
    size: "tall",
    aspectRatio: "4/5",
    imageLabel: "Aesthetic treatment detail — [CLIENT INPUT REQUIRED: real photography]",
    alt: "Aesthetic treatment environment at Sakha",
  },
  {
    id: "before-after-1",
    type: "before-after",
    category: "Before & After",
    title: "Patient result",
    caption: "Shown with patient authorization. Individual results vary.",
    size: "large",
    aspectRatio: "4/5",
    beforeLabel: "Before — [CLIENT INPUT REQUIRED: authorized patient photography]",
    beforeAlt: "Before photograph, same angle and lighting as after photograph",
    afterLabel: "After — [CLIENT INPUT REQUIRED: authorized patient photography]",
    afterAlt: "After photograph, same angle and lighting as before photograph",
    note: "Published only with the patient's written authorization.",
  },
  {
    id: "before-after-2",
    type: "before-after",
    category: "Before & After",
    title: "Patient result",
    caption: "Shown with patient authorization. Individual results vary.",
    size: "regular",
    aspectRatio: "3/4",
    beforeLabel: "Before — [CLIENT INPUT REQUIRED: authorized patient photography]",
    beforeAlt: "Before photograph, same angle and lighting as after photograph",
    afterLabel: "After — [CLIENT INPUT REQUIRED: authorized patient photography]",
    afterAlt: "After photograph, same angle and lighting as before photograph",
    note: "Published only with the patient's written authorization.",
  },
];

export const galleryHeroData = {
  eyebrow: "Gallery",
  heading: "Sakha Gallery",
  description:
    "A look inside Sakha's clinic in Mazar-e-Sharif — the treatment environment, the care behind hair transplant and dermatology services, and results shared with patient authorization.",
};

export const galleryCTAData = {
  heading: "See it for yourself.",
  description:
    "Photographs only tell part of the story. Book a consultation to visit the clinic and discuss what's right for you.",
  cta: { label: "Book a Consultation", href: "/contact" },
};