import { Container } from "@/components/ui/Container";
import { HeroContent } from "./HeroContent";
import { HeroVisual } from "./HeroVisual";

/**
 * Editorial split-screen Hero: copy and CTAs on the left, a dominant
 * clinic image on the right. Server Component — the cinematic motion
 * lives in the client-only HeroContent and HeroVisual children.
 *
 * <Hero />
 */
export function Hero() {
  return (
    <section aria-label="Introduction" className="bg-ivory">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 py-15 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-11">
          <HeroContent />
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
