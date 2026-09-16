import { LuImage, LuPlus } from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import { Reveal } from "./Reveal";

/**
 * AdminHeader already carries "Dashboard" and its description, so this
 * doesn't repeat them — it frames the work and puts the two actions an
 * administrator starts from within reach.
 */
export function DashboardWelcome() {
  return (
    <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-xl">
        <h2 className="text-2xl font-semibold leading-tight text-charcoal sm:text-3xl">
          Manage Sakha&rsquo;s website content from one place
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Write and publish articles, and keep the clinic&rsquo;s photography up to date.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button href="/admin/blogs/add" icon={<LuPlus className="h-4 w-4" />}>
          Add blog
        </Button>
        <Button href="/admin/images" variant="outline" icon={<LuImage className="h-4 w-4" />}>
          Manage images
        </Button>
      </div>
    </Reveal>
  );
}
