"use client";

import { motion } from "framer-motion";
import {ImagePlaceholder} from "@/components/ui/ImagePlaceholder";
import type { SkinTreatmentsData } from "./data";

/**
 * Image: banner
 * Purpose: full-width establishing shot for the Skin Treatments section
 * Aspect ratio: 3:2
 * Object position: center
 * Desktop: full-bleed within container, fixed height band
 * Mobile: retains 3:2, full width
 */
export default function SkinTreatmentsBanner({
  data,
}: {
  data: SkinTreatmentsData;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <ImagePlaceholder
        label={data.bannerImage.label}
        className="w-full"
      />
    </motion.div>
  );
}