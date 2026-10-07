import { Container } from "@/components/ui/Container";
import { HeroContent } from "./HeroContent";
import { HeroDetails } from "./Herodetails";
import { HeroVisual } from "./HeroVisual";

/**
 * Personal-brand Hero for Dr. Ahmad Fahim Sakha. Server Component; the
 * motion and translations live in the client children.
 *
 * Three blocks are placed on one grid so mobile and desktop are each
 * composed on purpose:
 * - mobile:  headline + CTAs -> portrait -> trust details + quote
 * - desktop: headline + CTAs and details stacked on the inline start,
 *            portrait spanning both rows on the inline end.
 * Grid columns follow the document direction, so the portrait sits on the
 * left in Dari / Pashto without any physical left/right classes.
 *
 * The section is labelled by the <h1> (id="hero-heading") in HeroContent,
 * so no hardcoded aria-label is needed.
 *
 * <Hero />
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="overflow-x-clip bg-ivory"
    >
      <Container>
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 py-12 sm:py-16 lg:grid-cols-12 lg:gap-y-10 lg:py-10">
          <HeroContent />
          <HeroVisual />
          <HeroDetails />
        </div>
      </Container>
    </section>
  );
}