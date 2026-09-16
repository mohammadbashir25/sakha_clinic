import {Container} from "@/components/ui/Container";
import {ImagePlaceholder} from "@/components/ui/ImagePlaceholder";
import { contactHeroData } from "./data";

/**
 * Image: hero, supporting
 * Purpose: a small, calm supporting image — not the visual centerpiece,
 * since the two-column contact/form composition below carries the page
 * Aspect ratio: 4:5
 * Object position: center
 * Desktop: right column, contained width
 * Mobile: stacks below the text, full width
 */
export default function ContactHero() {
  return (
    <section className="bg-ivory pt-20 pb-16 lg:pt-20 lg:pb-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <span className="text-sm font-medium uppercase tracking-[0.18em] text-champagne">
              {contactHeroData.eyebrow}
            </span>
            <h1 className="mt-4 text-4xl leading-tight text-charcoal sm:text-5xl">
              {contactHeroData.heading}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {contactHeroData.description}
            </p>
          </div>

          <ImagePlaceholder
            label={contactHeroData.image.label}
            className="mx-auto w-full max-w-sm"
          />
        </div>
      </Container>
    </section>
  );
}