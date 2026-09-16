import {Container } from "@/components/ui/Container";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {Button} from "@/components/ui/Button";
import {ImagePlaceholder} from "@/components/ui/ImagePlaceholder";
import SkinTreatmentsBanner from "./SkinTreatmentsBanner";
import { skinTreatmentsData } from "./data";

export default function SkinTreatmentsService() {
  return (
    <section id="skin-treatments" className="bg-ivory py-20 lg:py-28">
      <Container>
        <SkinTreatmentsBanner data={skinTreatmentsData} />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow={skinTreatmentsData.eyebrow}
              title={skinTreatmentsData.heading}
              description={skinTreatmentsData.description}
              align="left"
            />
            <p className="mt-4 text-xs leading-relaxed text-muted/80 italic">
              {skinTreatmentsData.supportingNote}
            </p>
            <div className="mt-8">
              <Button href={skinTreatmentsData.cta.href} variant="primary">
                {skinTreatmentsData.cta.label}
              </Button>
            </div>
          </div>

          {/*
            Image: supporting
            Purpose: secondary detail shot alongside the section copy
            Aspect ratio: 3:2
            Object position: center
            Desktop: right column, sits beside the text block
            Mobile: stacks below the text block, full width
          */}
          <ImagePlaceholder
            label={skinTreatmentsData.supportingImage.label}
            className="w-full self-start"
          />
        </div>
      </Container>
    </section>
  );
}