import { Container } from "@/components/ui/Container";
import { BeforeAfterContent } from "./BeforeAfterContent";

/**
 * Before & After: client-provided treatment images shown one case at a time,
 * with user-controlled navigation (no autoplay), a quiet disclaimer and an
 * appointment call to action. Server Component; the translated copy, case
 * state and motion live in the client BeforeAfterContent. The section is
 * labelled by the <h2 id="before-after-heading"> rendered there.
 *
 * <BeforeAfter />
 */
export function BeforeAfter() {
  return (
    <section
      aria-labelledby="before-after-heading"
      className="overflow-x-clip bg-lavender"
    >
      <Container>
        <div className="py-16 sm:py-20 lg:py-28">
          <BeforeAfterContent />
        </div>
      </Container>
    </section>
  );
}
