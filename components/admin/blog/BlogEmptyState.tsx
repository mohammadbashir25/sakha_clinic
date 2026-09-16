import { LuPlus } from "react-icons/lu";
import { Button } from "@/components/ui/Button";

interface BlogEmptyStateProps {
  variant: "no-posts" | "no-results";
}

export function BlogEmptyState({ variant }: BlogEmptyStateProps) {
  const isNoPosts = variant === "no-posts";

  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-muted/25 bg-white px-6 py-14 text-center">
      <p className="text-base font-medium text-charcoal">
        {isNoPosts ? "No blog posts yet" : "No matching blog posts"}
      </p>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted">
        {isNoPosts
          ? "Create your first article to start building Sakha's content library."
          : "Try changing your search or filters."}
      </p>
      {isNoPosts && (
        <Button href="/admin/blogs/add" size="sm" className="mt-5" icon={<LuPlus className="h-4 w-4" />}>
          Add blog
        </Button>
      )}
    </div>
  );
}
