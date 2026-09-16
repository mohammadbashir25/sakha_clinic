import type { MediaImage } from "@/types/admin";
import { ImageCard } from "./ImageCard";

interface ImageGridProps {
  images: MediaImage[];
  mode?: "manage" | "picker";
  selectedId?: string;
  onView?: (image: MediaImage) => void;
  onDeleteRequest?: (image: MediaImage) => void;
  onSelect?: (image: MediaImage) => void;
}

/**
 * Deliberately thin — a future blog "Featured image" picker can render
 * this same grid with `mode="picker"` and an `onSelect` handler instead
 * of duplicating the layout.
 */
export function ImageGrid({
  images,
  mode = "manage",
  selectedId,
  onView,
  onDeleteRequest,
  onSelect,
}: ImageGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard
            image={image}
            mode={mode}
            selected={image.id === selectedId}
            onView={onView}
            onDeleteRequest={onDeleteRequest}
            onSelect={onSelect}
          />
        </li>
      ))}
    </ul>
  );
}
