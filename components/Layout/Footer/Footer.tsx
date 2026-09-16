import {Container} from "@/components/ui/Container";
import {Divider} from "@/components/ui/Divider";
import { footerData } from "./data";
import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";

/**
 * Footer — the final frame of the Sakha website.
 *
 * Stays a Server Component. FooterBrand and FooterLinks are Client
 * Components that each own a small, restrained motion reveal, so the
 * animation code only loads where it's actually used.
 */
export default function Footer() {
  const { brand, navigation, services, contact, copyright, legalLinks } =
    footerData;

  return (
    <footer className="bg-[#210038] px-6 py-16">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_2fr]">
          <FooterBrand brand={brand} />
          <FooterLinks
            navigation={navigation}
            services={services}
            contact={contact}
          />
        </div>

        <Divider className="my-10 border-[#F2EAF4]/10" />

        <div className="flex flex-col-reverse items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-[#F2EAF4]/50">{copyright}</p>

          {legalLinks && legalLinks.length > 0 && (
            <ul className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs text-[#F2EAF4]/50 transition-colors duration-200 hover:text-[#C96BD5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C96BD5]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </footer>
  );
}
