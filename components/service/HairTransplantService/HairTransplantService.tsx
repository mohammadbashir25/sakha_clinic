import {Container } from "@/components/ui/Container";
import {ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import HairTransplantContent from "./HairTransplantContent";
import { hairTransplantData } from "./data";

/**
 * Image: service feature
 * Purpose: hair transplant treatment environment
 * Aspect ratio: 4:5
 * Object position: center
 * Desktop: left column, image leads (image/content order alternates by section for rhythm)
 * Mobile: image first, full width, content stacks below
 */
export default function HairTransplantService() {
  return (
    <section id="hair-transplant" className="bg-ivory py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <ImagePlaceholder
            label={hairTransplantData.image.label}
            className="w-full lg:order-1"
          />
          <div className="lg:order-2">
            <HairTransplantContent data={hairTransplantData} />
          </div>
        </div>
      </Container>
    </section>
  );
}