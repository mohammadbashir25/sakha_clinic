import { LuPlus } from "react-icons/lu";
import { Button } from "@/components/ui/Button";

export function ImagesHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-2xl font-semibold leading-tight text-charcoal sm:text-3xl">Images</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          Manage the photography and visual assets used across the Sakha website.
        </p>
      </div>

      <Button href="/admin/images/add" icon={<LuPlus className="h-4 w-4" />}>
        Add image
      </Button>
    </div>
  );
}
