import {Container} from "@/components/ui/Container";
import {ImagePlaceholder} from "@/components/ui/ImagePlaceholder";
import StoryContent from "./StoryContent";
import { sakhaStoryData } from "./data";

/**
 * Image: story
 * Purpose: supports the founding-story copy with an authentic clinic image
 * Aspect ratio: 4:5
 * Object position: center
 * Desktop: left column, image leads; text sits in the narrower right column
 * Mobile: image first, full width, copy stacks below
 */
export default function SakhaStory() {
  return (
    <section className="bg-ivory py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <ImagePlaceholder
            label={sakhaStoryData.image.label}
            className="w-full"
          />
          <StoryContent data={sakhaStoryData} />
        </div>
      </Container>
    </section>
  );
}