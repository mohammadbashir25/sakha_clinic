import {Container} from "@/components/ui/Container";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {ImagePlaceholder} from "@/components/ui/ImagePlaceholder";
import { teamData } from "./data";

/**
 * Image: team portrait
 * Purpose: real staff portraits only — never fabricated
 * Aspect ratio: 3:4
 * Object position: center
 * Desktop: grid of portraits, up to 4 per row
 * Mobile: two per row, portraits remain full-size (no thumbnails)
 * Note: this section renders nothing image-related until the clinic
 * supplies real staff to display — see the pending note below.
 */
export default function Team() {
  const hasMembers = teamData.members.length > 0;

  return (
    <section className="bg-ivory py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={teamData.eyebrow}
          title={teamData.heading}
          align="left"
        />

        {hasMembers ? (
          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 lg:gap-8">
            {teamData.members.map((member) => (
              <div key={member.name}>
                <ImagePlaceholder
                  label={member.image.label}
                  className="w-full"
                />
                <p className="mt-3 text-sm font-medium text-charcoal">
                  {member.name}
                </p>
                <p className="text-sm text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-10 max-w-xl text-sm leading-relaxed text-muted/80 italic">
            {teamData.pendingNote}
          </p>
        )}
      </Container>
    </section>
  );
}