import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import DermatologyContent from "./DermatologyContent";
import { dermatologyData } from "./data";

/**
 * Image: service feature
 * Purpose: dermatology consultation environment
 * Aspect ratio: 4:5
 * Object position: center
 * Desktop: right column (mirrors Hair Transplant's left-image layout for rhythm)
 * Mobile: image first, full width, content stacks below
 */
export default function DermatologyService() {
  return (
    <section id="dermatology" className="bg-lavender/40 py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:order-1">
            <DermatologyContent data={dermatologyData} />
          </div>
          <ImagePlaceholder
            label={dermatologyData.image.label}
            className="w-full lg:order-2"
          />
        </div>
      </Container>
    </section>
  );
}