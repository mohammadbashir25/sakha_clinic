import type { Metadata } from "next";
import GalleryHero from "@/components/gallery/GalleryHero/GalleryHero";
import GalleryGrid from "@/components/gallery/GalleryGrid/GalleryGrid";
import GalleryCTA from "@/components/gallery/GalleryCTA/GalleryCTA";

export const metadata: Metadata = {
  title: "Gallery | Sakha Hair Transplant, Dermatology & Beauty Center",
  description:
    "A look inside Sakha's clinic in Mazar-e-Sharif — the treatment environment, the care behind hair transplant and dermatology services, and results shared with patient authorization.",
};

export default function GalleryPage() {
  return (
    <main>
      <GalleryHero />
      <GalleryGrid />
      <GalleryCTA />
    </main>
  );
}