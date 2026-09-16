"use client";

import { motion } from "framer-motion";
import {ImagePlaceholder} from "@/components/ui/ImagePlaceholder";
import type { GalleryItem as GalleryItemType, GallerySize } from "../data";

const sizeClasses: Record<GallerySize, string> = {
  large: "lg:col-span-2 lg:row-span-2",
  wide: "lg:col-span-2",
  tall: "lg:row-span-2",
  regular: "",
};

export default function GalleryItem({
  item,
  index,
  onOpen,
}: {
  item: GalleryItemType;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 4) * 0.06 }}
      className={sizeClasses[item.size]}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${item.title} in gallery viewer`}
        className="group block h-full w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
      >
        {item.type === "image" ? (
          <ImagePlaceholder
            label={item.imageLabel}



            className="h-full w-full border border-muted/15 transition-opacity group-hover:opacity-90"
          />
        ) : (
          <div className="grid h-full grid-cols-2 gap-1 border border-muted/15 p-1">
            <ImagePlaceholder
              label={item.beforeLabel}


              className="h-full w-full"
            />
            <ImagePlaceholder
              label={item.afterLabel}


              className="h-full w-full"
            />
          </div>
        )}
        <span className="mt-3 block text-sm text-charcoal">{item.title}</span>
      </button>
    </motion.div>
  );
}