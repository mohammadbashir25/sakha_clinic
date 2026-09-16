import { LuRefreshCw, LuTriangleAlert } from "react-icons/lu";

interface TestimonialErrorStateProps {
  onRetry: () => void;
}

export function TestimonialErrorState({ onRetry }: TestimonialErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-muted/15 bg-white/60 px-6 py-16 text-center">
      <LuTriangleAlert className="h-8 w-8 text-muted/60" aria-hidden="true" />
      <div>
        <p className="text-sm font-medium text-charcoal">Unable to load testimonials.</p>
        <p className="mt-1 text-sm text-muted">Please try again.</p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-lg border border-muted/20 px-3.5 py-2 text-sm font-medium text-charcoal hover:bg-muted/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
      >
        <LuRefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
        Retry
      </button>
    </div>
  );
}
