import {Container} from "@/components/ui/Container";
import {ImagePlaceholder} from "@/components/ui/ImagePlaceholder";
import { aboutHeroData } from "./data";

/**
 * Image: hero
 * Purpose: establish the About page with an authentic clinic image
 * Aspect ratio: 4:5 (desktop), same ratio carried to mobile to keep the image substantial
 * Object position: center
 * Desktop: full-width band beneath a minimal, centered text block
 * Mobile: text first, image follows at full width
 */
export default function AboutHero() {
  return (
    <section className="bg-ivory pt-20 pb-16 lg:pt-20 lg:pb-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-[0.18em] text-champagne">
            {aboutHeroData.eyebrow}
          </span>
          <h1 className="mt-4 text-4xl leading-tight text-charcoal sm:text-5xl lg:text-6xl">
            {aboutHeroData.heading}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {aboutHeroData.description}
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <ImagePlaceholder
            label={aboutHeroData.image.label}
            className="w-full"
          />
        </div>
      </Container>
    </section>
  );
}