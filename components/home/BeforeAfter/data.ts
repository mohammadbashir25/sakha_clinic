/**
 * Static data for the Before & After section.
 *
 * All visible text lives in messages/*.json under the "BeforeAfter"
 * namespace. This file only lists the cases and where each client-provided
 * image lives. No patient names, ages, dates or stories are stored — only
 * what the client material actually provides.
 *
 * TO ADD THE CLIENT IMAGES: for each case, set `image` to the real file
 * (under /public) and its REAL pixel dimensions, e.g.
 *
 *   { id: "case-1", image: { src: "/images/before-after/case-1.jpg", width: 1600, height: 1000 } }
 *
 * The width/height are the image's own dimensions (used only to reserve the
 * correct aspect ratio so nothing is cropped or stretched). Until `image` is
 * set, the case shows the project's ImagePlaceholder. Remove or add entries
 * to match the number of supplied images (approximately 3–4).
 *
 * Each image is displayed whole (object-contain) because the client's
 * composition already contains its own before/after labels; nothing is
 * overlaid on top of it.
 */

export interface BeforeAfterImage {
  /** Existing asset path under /public. Never fabricate a path here. */
  src: string;
  /** The image's real intrinsic width in pixels. */
  width: number;
  /** The image's real intrinsic height in pixels. */
  height: number;
}

export interface BeforeAfterCase {
  id: string;
  /** Unset until the real client image is supplied. */
  image?: BeforeAfterImage;
}

export const beforeAfterCases: BeforeAfterCase[] = [
  {
    id: "case-1",
    image: { src: "/images/case-1.jpeg", width: 1600, height: 1000 },
  },
  {
    id: "case-2",
    image: { src: "/images/case-2.webp", width: 1600, height: 1000 },
  },
  {
    id: "case-3",
    image: { src: "/images/case-3.webp", width: 1600, height: 1000 },
  },
];

/** Existing appointment destination used across the site. */
export const appointmentPath = "/book-a-consultation";
