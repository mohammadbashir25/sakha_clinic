import { BlogListSkeleton } from "@/components/admin/blog/BlogListSkeleton";

export default function BlogsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-7 w-28 animate-pulse rounded bg-muted/15" />
          <div className="h-4 w-72 animate-pulse rounded bg-muted/15" />
        </div>
        <div className="h-10 w-28 animate-pulse rounded-xl bg-muted/15" />
      </div>

      <BlogListSkeleton />
    </div>
  );
}
