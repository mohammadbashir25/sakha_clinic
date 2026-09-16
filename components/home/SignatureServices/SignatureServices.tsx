import { Container } from "@/components/ui/Container";
import { SignatureServicesHeader } from "./SignatureServicesHeader";
import { ServiceCard } from "./ServiceCard";
import { signatureServicesData } from "./data";

/**
 * Editorial showcase of Sakha's four core service categories: Hair
 * Transplant gets a wider, more prominent card; Dermatology, Skin
 * Treatments, and Aesthetic Treatments follow in an even row below.
 * Server Component — the cinematic scroll reveals live in the
 * client-only header and card children.
 *
 * <SignatureServices />
 */
export function SignatureServices() {
  const [featuredService, ...otherServices] = signatureServicesData.services;

  return (
    <section aria-labelledby="signature-services-heading" className="bg-ivory">
      <Container>
        <div className="py-16 sm:py-20 lg:py-28">
          <SignatureServicesHeader />

          <div className="mt-12 flex flex-col gap-6 sm:mt-16">
            <ServiceCard service={featuredService} variant="featured" index={0} />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {otherServices.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index + 1} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
