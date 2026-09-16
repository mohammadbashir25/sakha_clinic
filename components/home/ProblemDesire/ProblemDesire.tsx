import { Container } from "@/components/ui/Container";
import { ProblemDesireContent } from "./ProblemDesireContent";
import { ProblemDesireVisual } from "./ProblemDesireVisual";

/**
 * Editorial, asymmetrical Problem/Desire section: empathetic copy and
 * concern list on the wider side, a calm consultation image on the
 * narrower side. Server Component — the cinematic motion lives in the
 * client-only ProblemDesireContent and ProblemDesireVisual children.
 *
 * <ProblemDesire />
 */
export function ProblemDesire() {
  return (
    <section aria-labelledby="problem-desire-heading" className="bg-ivory">
      <Container>
        <div className="grid grid-cols-1 items-start gap-14 py-16 sm:py-20 lg:grid-cols-5 lg:gap-16 lg:py-28">
          <div className="lg:col-span-3">
            <ProblemDesireContent />
          </div>
          <div className="lg:order-first lg:col-span-2">
            <ProblemDesireVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}