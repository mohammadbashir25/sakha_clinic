import {Container} from "@/components/ui/Container";
import {ImagePlaceholder} from "@/components/ui/ImagePlaceholder";
import EnvironmentContent from "./EnvironmentContent";
import { clinicEnvironmentData } from "./data";

/**
 * Image: environment
 * Purpose: large, full-bleed-feeling shot of the clinic environment
 * Aspect ratio: 16:9
 * Object position: center
 * Desktop: full width within the container, text centered above
 * Mobile: retains 16:9, full width, text stacks above at reduced size
 */
export default function ClinicEnvironment() {
  return (
    <section className="bg-lavender/40 py-20 lg:py-28">
      <Container>
        <EnvironmentContent data={clinicEnvironmentData} />
        <div className="mt-12">
          <ImagePlaceholder
            label={clinicEnvironmentData.image.label}
            className="w-full"
          />
        </div>
      </Container>
    </section>
  );
}