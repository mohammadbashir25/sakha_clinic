import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesDirectory from "@/components/services/ServicesDirectory";
import ServicesCTA from "@/components/services/ServicesCTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "ServicesPage.hero",
  });

  return {
    title: t("eyebrow"),
    description: t("description"),
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ServicesHero />
      <ServicesDirectory />
      <ServicesCTA />
    </main>
  );
}