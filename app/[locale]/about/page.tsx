import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AboutHero from "@/components/about/AboutHero";
import AboutProfile from "@/components/about/AboutProfile";
import AboutExperience from "@/components/about/AboutExperience";
import AboutApproach from "@/components/about/AboutApproach";
import AboutPractice from "@/components/about/AboutPractice";
import AboutBiofiller from "@/components/about/AboutBiofiller";
import AboutLearning from "@/components/about/AboutLearning";
import AboutJourney from "@/components/about/AboutJourney";
import AboutPhilosophy from "@/components/about/AboutPhilosophy";
import AboutCTA from "@/components/about/AboutCTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "AboutPage.hero",
  });

  return {
    title: t("eyebrow"),
    description: t("description"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <AboutHero />
      <AboutProfile />
      <AboutExperience />
      <AboutApproach />
      <AboutPractice />
      <AboutBiofiller />
      <AboutLearning />
      <AboutJourney />
      <AboutPhilosophy />
      <AboutCTA />
    </main>
  );
}