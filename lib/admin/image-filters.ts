import type { MediaImage } from "@/types/admin";

export interface ImageFilters {
  query: string;
  category: string;
}

export const ALL_CATEGORIES = "all";

/**
 * Pure, synchronous filtering over the in-memory mock list. When a real
 * search endpoint exists, this becomes `await searchImages(filters)` —
 * the page component already treats filtering as a discrete step over
 * an already-fetched `images` array, so nothing else needs to change.
 */
export function filterImages(images: MediaImage[], filters: ImageFilters): MediaImage[] {
  const query = filters.query.trim().toLowerCase();

  return images.filter((image) => {
    const matchesCategory = filters.category === ALL_CATEGORIES || image.category === filters.category;
    const matchesQuery =
      query.length === 0 ||
      image.filename.toLowerCase().includes(query) ||
      image.title.toLowerCase().includes(query) ||
      image.alt.toLowerCase().includes(query);

    return matchesCategory && matchesQuery;
  });
}
