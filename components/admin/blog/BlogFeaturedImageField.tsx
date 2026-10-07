"use client";

import { useState } from "react";
import { LuImageOff, LuImagePlus, LuX } from "react-icons/lu";
import type { MediaImage } from "@/types/admin";
import { cn } from "@/components/ui/utils";

interface BlogFeaturedImageFieldProps {
  coverImage: string;
  coverImageAlt: string;
  images: MediaImage[];
  onChange: (image: { coverImage: string; coverImageAlt: string }) => void;
  onRemove: () => void;
}

export function BlogFeaturedImageField({
  coverImage,
  coverImageAlt,
  images,
  onChange,
  onRemove,
}: BlogFeaturedImageFieldProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const selected = images.find((image) => image.url === coverImage);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-charcoal">Featured image</span>

      <div className="overflow-hidden rounded-lg border border-muted/20 bg-ivory">
        {coverImage ? (
          <div className="flex items-center gap-3 p-3">
            {/* Mock media library — no real image bytes yet, so show a labeled swatch. */}
            <div
              aria-hidden="true"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-lavender text-xs font-medium text-primary"
            >
              {(selected?.title ?? coverImageAlt).slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-charcoal">
                {selected?.title ?? coverImageAlt}
              </p>
              <p className="truncate text-xs text-muted">{coverImageAlt}</p>
            </div>
            <button
              type="button"
              onClick={onRemove}
              aria-label="Remove featured image"
              className="rounded-full p-1.5 text-muted/60 hover:bg-muted/10 hover:text-charcoal"
            >
              <LuX className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 py-6 text-center">
            <LuImageOff className="h-5 w-5 text-muted/50" aria-hidden="true" />
            <p className="text-xs text-muted">No image selected</p>
          </div>
        )}

        <button
          type="button"
          onClick={() => setPickerOpen((open) => !open)}
          aria-expanded={pickerOpen}
          className="flex w-full items-center justify-center gap-2 border-t border-muted/15 py-2.5 text-sm font-medium text-primary hover:bg-lavender/30"
        >
          <LuImagePlus className="h-4 w-4" aria-hidden="true" />
          {coverImage ? "Replace image" : "Choose from media library"}
        </button>
      </div>

      {pickerOpen && (
        <div className="grid grid-cols-3 gap-2 rounded-lg border border-muted/15 bg-white/60 p-2 sm:grid-cols-4">
          {images.map((image) => (
            <button
              key={image.id}
              type="button"
              onClick={() => {
                onChange({ coverImage: image.url, coverImageAlt: image.alt });
                setPickerOpen(false);
              }}
              className={cn(
                "flex flex-col items-center gap-1 rounded-md border p-2 text-center transition-colors duration-200",
                image.url === coverImage
                  ? "border-champagne bg-champagne/10"
                  : "border-transparent hover:bg-lavender/30",
              )}
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-lavender text-[10px] font-medium text-primary"
              >
                {image.title.slice(0, 2).toUpperCase()}
              </span>
              <span className="line-clamp-1 text-[11px] text-charcoal">{image.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
