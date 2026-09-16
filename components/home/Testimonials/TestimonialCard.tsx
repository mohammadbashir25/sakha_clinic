import Image from "next/image";
import { FiStar } from "react-icons/fi";
import type { Testimonial } from "./data";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

/**
 * Renders a single testimonial as the large "stage" card. Purely
 * presentational — no client hooks, no animation of its own. The
 * parent (Testimonials.tsx) owns the crossfade between records.
 */
export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { name, testimonial: quote, rating, treatment, image, date } =
    testimonial;

  return (
    <figure className="relative mx-auto max-w-2xl rounded-2xl border border-[#320154]/10 bg-white/60 px-6 py-12 text-center sm:px-14 sm:py-16">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none font-serif text-[72px] leading-none text-[#C9A86A]/15 sm:top-8 sm:text-[96px]"
      >
        &ldquo;
      </span>

      <blockquote className="relative">
        <p className="text-xl leading-relaxed text-[#320154] sm:text-2xl">
          {quote}
        </p>
      </blockquote>

      {typeof rating === "number" && (
        <div
          className="mt-6 flex items-center justify-center gap-1.5"
          aria-label={`Rated ${rating} out of 5`}
        >
          <span className="flex" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <FiStar
                key={i}
                size={14}
                className={
                  i < rating
                    ? "fill-[#C9A86A] text-[#C9A86A]"
                    : "text-[#320154]/15"
                }
              />
            ))}
          </span>
          <span className="text-xs text-[#716B75]">{rating}/5</span>
        </div>
      )}

      <div className="mx-auto mt-8 h-px w-10 bg-[#320154]/15" />

      <figcaption className="mt-6 flex flex-col items-center gap-3">
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F2EAF4] text-sm font-medium text-[#320154]">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="48px"
              className="object-cover"
            />
          ) : (
            <span aria-hidden="true">{getInitials(name)}</span>
          )}
        </span>

        <div>
          <cite className="block text-sm font-medium not-italic text-[#320154]">
            {name}
          </cite>
          <p className="mt-1 text-xs uppercase tracking-wide text-[#716B75]">
            {[treatment, date].filter(Boolean).join(" · ")}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

/** "Ahmad R." -> "AR". Used as a graceful fallback when no photo is supplied. */
function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}