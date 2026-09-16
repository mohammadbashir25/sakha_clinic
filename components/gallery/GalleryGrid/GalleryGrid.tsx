"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { Container } from "@/components/ui/Container";
import GalleryFilters from "../GalleryFilters/GalleryFilters";
import GalleryLightbox from "../GalleryLightbox/GalleryLightbox";
import GalleryItem from "./GalleryItem";

import {
  galleryItems,
  type GalleryCategory,
} from "../data";

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("All");

  const [lightboxIndex, setLightboxIndex] =
    useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return galleryItems;
    }

    return galleryItems.filter(
      (item) => item.category === activeCategory
    );
  }, [activeCategory]);

  const handleCategoryChange = (
    category: GalleryCategory
  ) => {
    setActiveCategory(category);
    setLightboxIndex(null);
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNavigateLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  return (
    <section
      aria-label="Gallery"
      className="bg-ivory pb-20 lg:pb-28"
    >
      <Container>
        <GalleryFilters
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
        />

        {filteredItems.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-4 lg:gap-5">
            {filteredItems.map((item, index) => (
              <GalleryItem
                key={item.id}
                item={item}
                index={index}
                onOpen={() => handleOpenLightbox(index)}
              />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-muted">
            No images in this category yet.
          </p>
        )}
      </Container>

      <AnimatePresence>
        {lightboxIndex !== null && filteredItems.length > 0 && (
          <GalleryLightbox
            items={filteredItems}
            activeIndex={lightboxIndex}
            onClose={handleCloseLightbox}
            onNavigate={handleNavigateLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
}