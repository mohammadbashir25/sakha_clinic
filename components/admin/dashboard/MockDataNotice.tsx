import { LuInfo } from "react-icons/lu";

/**
 * Keeps the UI honest while the frontend runs on mock content.
 * Delete this component (and its usage in app/admin/page.tsx) once
 * real data is wired up.
 */
export function MockDataNotice() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-champagne/40 bg-champagne/10 px-4 py-3">
      <LuInfo className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />
      <p className="text-sm leading-relaxed text-charcoal">
        <span className="font-medium">Showing mock content.</span>{" "}
        <span className="text-muted">
          These posts, images and counts come from local placeholder data, not the live site.
        </span>
      </p>
    </div>
  );
}
