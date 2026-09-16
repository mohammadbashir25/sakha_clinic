import { Container} from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import AestheticTreatmentsContent from "./AestheticTreatmentsContent";
import { aestheticTreatmentsData } from "./data";

/**
 * Image: service feature
 * Purpose: aesthetic treatments consultation environment
 * Aspect ratio: 4:5
 * Object position: center
 * Desktop: left column, paired with a divided list (distinct composition from the other two feature sections)
 * Mobile: image first, full width, content stacks below
 */
export default function AestheticTreatmentsService() {
  return (
    <section id="aesthetic-treatments" className="bg-lavender/40 py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <ImagePlaceholder
            label={aestheticTreatmentsData.image.label}
            className="w-full"
          />
          <AestheticTreatmentsContent data={aestheticTreatmentsData} />
        </div>
      </Container>
    </section>
  );
}