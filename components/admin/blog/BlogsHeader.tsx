import { LuPlus } from "react-icons/lu";
import { Button } from "@/components/ui/Button";

export function BlogsHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-2xl font-semibold leading-tight text-charcoal sm:text-3xl">Blogs</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          Create and manage Sakha&rsquo;s medical and educational content.
        </p>
      </div>

      <Button href="/admin/blogs/add" icon={<LuPlus className="h-4 w-4" />}>
        Add blog
      </Button>
    </div>
  );
}
