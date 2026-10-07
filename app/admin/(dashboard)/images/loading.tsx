import { ImageGridSkeleton } from "@/components/admin/images/ImageGridSkeleton";

export default function ImagesLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-7 w-24 animate-pulse rounded bg-muted/15" />
          <div className="h-4 w-80 animate-pulse rounded bg-muted/15" />
        </div>
        <div className="h-10 w-32 animate-pulse rounded-xl bg-muted/15" />
      </div>

      <ImageGridSkeleton />
    </div>
  );
}
