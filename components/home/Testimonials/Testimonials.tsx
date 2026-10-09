import { getLocale, getTranslations } from "next-intl/server";
import { PiQuotesLight } from "react-icons/pi";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/i18n/config";
import { Link } from "@/i18n/navigation";
import { getTestimonials } from "./getTestimonials";
import { TestimonialsCarousel } from "./TestimonialsCarousel";
import type { Testimonial } from "./types";

/** Existing appointment destination used across the site. */
const appointmentPath = "/contact";

/**
 * Testimonials section. A Server Component: it loads the data through the
 * single `getTestimonials()` function, renders the static copy, and hands
 * only the testimonial list to the small client carousel.
 *
 * - Data present  -> featured carousel (controls only when there are 2+)
 * - No data       -> a calm, translated empty state
 * - Load failed   -> a translated error state (no technical details)
 *
 * Copy comes from "Testimonials.*"; the testimonial text/name/treatment are
 * dynamic data and are not translated here.
 *
 * <Testimonials />
 */
export async function Testimonials() {
  const t = await getTranslations("Testimonials");
  const locale = (await getLocale()) as Locale;

  let testimonials: Testimonial[] = [];
  let hasError = false;
  try {
    testimonials = await getTestimonials(locale);
  } catch {
    hasError = true;
  }

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="overflow-x-clip bg-ivory"
    >
      <Container>
        <div className="flex flex-col gap-12 py-16 sm:gap-14 sm:py-20 lg:gap-16 lg:py-28">
          {/* Header */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="flex flex-col gap-5 lg:col-span-7">
              <p className="flex items-center gap-3 text-sm font-medium text-muted">
                <span aria-hidden="true" className="h-px w-8 bg-champagne" />
                {t("eyebrow")}
              </p>
              <h2
                id="testimonials-heading"
                className="text-3xl font-semibold leading-[1.2] text-primary sm:text-4xl lg:text-5xl rtl:leading-[1.45]"
              >
                {t("title")}
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted sm:text-lg lg:col-span-5">
              {t("description")}
            </p>
          </div>

          {/* Showcase / empty / error */}
          {hasError ? (
            <StatePanel
              title={t("errorTitle")}
              description={t("errorDescription")}
            />
          ) : testimonials.length === 0 ? (
            <StatePanel
              title={t("emptyTitle")}
              description={t("emptyDescription")}
            />
          ) : (
            <TestimonialsCarousel testimonials={testimonials} />
          )}

          {/* Supporting CTA */}
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 border-t border-champagne pt-10 text-center sm:pt-12">
            <h3 className="text-2xl font-semibold leading-[1.25] text-primary sm:text-3xl rtl:leading-[1.5]">
              {t("ctaTitle")}
            </h3>
            <p className="text-base leading-relaxed text-muted">
              {t("ctaDescription")}
            </p>
            <Link
              href={appointmentPath}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 text-base font-medium text-ivory transition-colors duration-300 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory sm:w-auto"
            >
              <HiOutlineCalendarDays size={18} aria-hidden="true" />
              {t("bookAppointment")}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Shared calm panel for the empty and error states. */
function StatePanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      role="status"
      className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 rounded-lg border border-muted/15 bg-lavender px-6 py-12 text-center sm:px-10 sm:py-14"
    >
      <PiQuotesLight size={28} aria-hidden="true" className="text-champagne" />
      <h3 className="text-xl font-semibold text-primary sm:text-2xl rtl:leading-[1.5]">
        {title}
      </h3>
      <p className="max-w-md text-base leading-relaxed text-muted">
        {description}
      </p>
    </div>
  );
}
