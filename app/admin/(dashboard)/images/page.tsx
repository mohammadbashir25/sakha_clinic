"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/admin/dashboard/Reveal";
import { Pagination } from "@/components/admin/shared/Pagination";
import { DeleteImageDialog } from "@/components/admin/images/DeleteImageDialog";
import { ImageDetailsDialog } from "@/components/admin/images/ImageDetailsDialog";
import { ImageEmptyState } from "@/components/admin/images/ImageEmptyState";
import { ImageGrid } from "@/components/admin/images/ImageGrid";
import { ImageToolbar } from "@/components/admin/images/ImageToolbar";
import { ImagesHeader } from "@/components/admin/images/ImagesHeader";
import { ALL_CATEGORIES, filterImages } from "@/lib/admin/image-filters";
import { imageCategories, mockImages } from "@/lib/mock/admin-data";
import type { MediaImage } from "@/types/admin";

const PAGE_SIZE = 10;

/**
 * Frontend-only: `images` starts from the mock array, and every action
 * (edit, delete) just updates that state. When the API lands, replace
 * the state initializer and the two handlers below with real calls —
 * everything downstream (grid, dialogs, filters) stays the same.
 */
export default function ImagesPage() {
  const [images, setImages] = useState<MediaImage[]>(mockImages);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [page, setPage] = useState(1);
  const [viewTarget, setViewTarget] = useState<MediaImage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaImage | null>(null);

  const filteredImages = useMemo(
    () => filterImages(images, { query, category }),
    [images, query, category],
  );

  const pageCount = Math.max(1, Math.ceil(filteredImages.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visibleImages = filteredImages.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function updateFilter<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value);
      setPage(1);
    };
  }

  function handleDeleteRequest(image: MediaImage) {
    // Deleting from the details view closes it first so the dialog
    // that follows isn't stacked behind it.
    setViewTarget(null);
    setDeleteTarget(image);
  }

  function handleConfirmDelete(image: MediaImage) {
    setImages((current) => current.filter((item) => item.id !== image.id));
    setDeleteTarget(null);
  }

  function handleSaveDetails(updated: MediaImage) {
    setImages((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    setViewTarget(updated);
  }

  const hasAnyImages = images.length > 0;
  const hasVisibleImages = visibleImages.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <ImagesHeader />
      </Reveal>

      <Reveal index={1}>
        <ImageToolbar
          query={query}
          onQueryChange={updateFilter(setQuery)}
          category={category}
          onCategoryChange={updateFilter(setCategory)}
          categories={imageCategories}
        />
      </Reveal>

      <Reveal index={2}>
        {!hasAnyImages ? (
          <ImageEmptyState variant="no-images" />
        ) : !hasVisibleImages ? (
          <ImageEmptyState variant="no-results" />
        ) : (
          <div className="flex flex-col gap-6">
            <ImageGrid
              images={visibleImages}
              onView={setViewTarget}
              onDeleteRequest={handleDeleteRequest}
            />
            <Pagination page={currentPage} pageCount={pageCount} onPageChange={setPage} />
          </div>
        )}
      </Reveal>

      <ImageDetailsDialog
        image={viewTarget}
        categories={imageCategories}
        onClose={() => setViewTarget(null)}
        onDeleteRequest={handleDeleteRequest}
        onSave={handleSaveDetails}
      />

      <DeleteImageDialog
        image={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
