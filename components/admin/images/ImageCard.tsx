import { LuEye, LuTrash2 } from "react-icons/lu";
import { cn } from "@/components/ui/utils";
import { MediaThumb } from "@/components/admin/dashboard/MediaThumb";
import type { MediaImage } from "@/types/admin";

interface ImageCardProps {
  image: MediaImage;
  /**
   * "manage" (default) is the admin library: hover/focus reveals View and
   * Delete. "picker" is for future reuse (e.g. a blog "Featured image"
   * selector) — the whole card becomes a single select action instead.
   */
  mode?: "manage" | "picker";
  selected?: boolean;
  onView?: (image: MediaImage) => void;
  onDeleteRequest?: (image: MediaImage) => void;
  onSelect?: (image: MediaImage) => void;
}

export function ImageCard({
  image,
  mode = "manage",
  selected = false,
  onView,
  onDeleteRequest,
  onSelect,
}: ImageCardProps) {
  if (mode === "picker") {
    return (
      <button
        type="button"
        onClick={() => onSelect?.(image)}
        aria-pressed={selected}
        className={cn(
          "group flex flex-col gap-2 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory",
        )}
      >
        <MediaThumb
          src={image.url}
          alt={image.alt}
          sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 45vw"
          className={cn(
            "aspect-[4/3] w-full rounded-lg border-2 transition-colors duration-200",
            selected ? "border-orchid" : "border-transparent group-hover:border-muted/30",
          )}
        />
        <ImageCaption image={image} />
      </button>
    );
  }

  return (
    <div className="group flex flex-col gap-2">
      <div className="relative">
        <button
          type="button"
          onClick={() => onView?.(image)}
          aria-label={`View details for ${image.title}`}
          className="block w-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        >
          <MediaThumb
            src={image.url}
            alt={image.alt}
            sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 45vw"
            className="aspect-[4/3] w-full rounded-lg border border-muted/15"
          />
        </button>

        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-end gap-1 rounded-b-lg bg-gradient-to-t from-charcoal/60 to-transparent p-2 opacity-100 transition-opacity duration-200",
            "md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100",
          )}
        >
          <button
            type="button"
            onClick={() => onView?.(image)}
            aria-label={`View details for ${image.title}`}
            className="pointer-events-auto flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-charcoal transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
          >
            <LuEye className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onDeleteRequest?.(image)}
            aria-label={`Delete ${image.title}`}
            className="pointer-events-auto flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-red-600 transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
          >
            <LuTrash2 className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ImageCaption image={image} />
    </div>
  );
}

function ImageCaption({ image }: { image: MediaImage }) {
  return (
    <div className="min-w-0">
      <p className="truncate text-xs font-medium text-charcoal">{image.title}</p>
      <p className="truncate text-[11px] text-muted">{image.category}</p>
    </div>
  );
}
