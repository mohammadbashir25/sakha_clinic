import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import ServicesHeroContent from "./ServicesHeroContent";
import { servicesHeroData } from "./data";

/**
 * Image: hero
 * Purpose: establish the Services page — clinic interior or consultation moment
 * Aspect ratio: 16:9 (desktop), crops to 4:5 on mobile via ImagePlaceholder's responsive prop
 * Object position: center
 * Desktop: full-bleed right column, fixed 16:9 frame
 * Mobile: stacks below content, 4:5 frame to keep it substantial without dominating the viewport
 */
export default function ServicesHero() {
  return (
    <section className="bg-ivory pt-20 pb-20 lg:pt-20 lg:pb-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ServicesHeroContent data={servicesHeroData} />
          <ImagePlaceholder
            label={servicesHeroData.image.label}
            aspectRatio="wide"
            className="w-full"
          />
        </div>
      </Container>
    </section>
  );
}