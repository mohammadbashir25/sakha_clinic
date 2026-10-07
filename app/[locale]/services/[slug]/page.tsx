import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ServiceDetail from "@/components/services/ServicesDetail";
import RelatedServices from "@/components/services/RelatedServices";
import ServicesCTA from "@/components/services/ServicesCTA";
import { getServiceBySlug, serviceSlugs } from "@/components/services/data";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const t = await getTranslations({ locale, namespace: "ServicesPage" });

  return {
    title: t(`${service.translationKey}.title`),
    description: t(`${service.translationKey}.description`),
  };
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <main>
      <ServiceDetail service={service} />
      <RelatedServices service={service} />
      <ServicesCTA />
    </main>
  );
}