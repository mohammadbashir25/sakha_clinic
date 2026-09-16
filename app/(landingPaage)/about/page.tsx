import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero/AboutHero";
import SakhaStory from "@/components/about/SakhaStory/SakhaStory";
import Philosophy from "@/components/about/Philosophy/Philosophy";
import CareApproach from "@/components/about/CareApproach/CareApproach";
import ClinicEnvironment from "@/components/about/ClinicEnvironment/ClinicEnvironment";
import Team from "@/components/about/Team/Team";
import AboutCTA from "@/components/about/AboutCTA/AboutCTA";

export const metadata: Metadata = {
  title: "About | Sakha Hair Transplant, Dermatology & Beauty Center",
  description:
    "Sakha brings together hair restoration, dermatology, skin, and aesthetic care in Mazar-e-Sharif, in a setting designed around thoughtful consultation and individual needs.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <SakhaStory />
      <Philosophy />
      <CareApproach />
      <ClinicEnvironment />
      <Team />
      <AboutCTA />
    </main>
  );
}