import { Container } from "@/components/ui/Container";
import { ProblemDesireContent } from "./ProblemDesireContent";

/**
 * Problem & Desire section, shown right after the Hero. Purely typographic
 * (no second portrait — the Hero already carries Dr. Sakha's image): an
 * introduction, a lightweight list of common concerns, a lavender panel of
 * what the visitor is looking for, and a quiet closing statement.
 *
 * Server Component; copy and motion live in the client ProblemDesireContent.
 * The section is labelled by the <h2 id="problem-desire-heading"> rendered
 * there, so no hardcoded aria-label is needed.
 *
 * <ProblemDesire />
 */
export function ProblemDesire() {
  return (
    <section
      aria-labelledby="problem-desire-heading"
      className="overflow-x-clip bg-ivory"
    >
      <Container>
        <div className="py-16 sm:py-20 lg:py-28">
          <ProblemDesireContent />
        </div>
      </Container>
    </section>
  );
}