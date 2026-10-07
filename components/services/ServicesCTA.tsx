import { getTranslations } from "next-intl/server";
import { FiArrowUpRight } from "react-icons/fi";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";
import { buttonOnDark } from "./ServicesShared";
import { servicesLinks } from "./data";

export default async function ServicesCTA() {
  const t = await getTranslations("ServicesPage");

  return (
    <section
      aria-labelledby="services-cta-heading"
      className="bg-primary py-24 lg:py-28"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="services-cta-heading"
            className="text-balance text-3xl leading-[1.25] text-ivory sm:text-4xl"
          >
            {t("cta.title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ivory/70 sm:text-lg">
            {t("cta.description")}
          </p>
          <div className="mt-10">
            <Link href={servicesLinks.appointment} className={buttonOnDark}>
              {t("cta.primary")}
              <FiArrowUpRight
                className="h-4 w-4 rtl:-scale-x-100"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}