import { Container } from "@/components/ui/Container";
import { SignatureServicesContent } from "./Signatureservicescontent";

/**
 * Signature Services: an editorial showcase of six featured service
 * categories (not a full directory), followed by Dr. Sakha's approach and the
 * two calls to action. Typography-first — no service imagery is required, and
 * the Hero already carries the doctor's portrait.
 *
 * Server Component; the translated copy and the scroll reveals live in the
 * client SignatureServicesContent. The section is labelled by the <h2
 * id="signature-services-heading"> rendered there.
 *
 * <SignatureServices />
 */
export function SignatureServices() {
  return (
    <section
      aria-labelledby="signature-services-heading"
      className="overflow-x-clip bg-ivory"
    >
      <Container>
        <div className="py-16 sm:py-20 lg:py-28">
          <SignatureServicesContent />
        </div>
      </Container>
    </section>
  );
}