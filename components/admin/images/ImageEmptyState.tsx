import { LuPlus } from "react-icons/lu";
import { Button } from "@/components/ui/Button";

interface ImageEmptyStateProps {
  variant: "no-images" | "no-results";
}

export function ImageEmptyState({ variant }: ImageEmptyStateProps) {
  const isNoImages = variant === "no-images";

  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-muted/25 bg-white px-6 py-14 text-center">
      <p className="text-base font-medium text-charcoal">
        {isNoImages ? "No images yet" : "No matching images"}
      </p>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted">
        {isNoImages
          ? "Upload your first image to start building Sakha's media library."
          : "Try changing your search or category."}
      </p>
      {isNoImages && (
        <Button href="/admin/images/add" size="sm" className="mt-5" icon={<LuPlus className="h-4 w-4" />}>
          Add image
        </Button>
      )}
    </div>
  );
}
