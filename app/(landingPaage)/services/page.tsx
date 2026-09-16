import type { Metadata } from "next";
import ServicesHero from "@/components/service/ServiceHero/ServiceHero";
import ServiceCategories from "@/components/service/ServiceCategories/ServiceCategories";
import HairTransplantService from "@/components/service/HairTransplantService/HairTransplantService";
import DermatologyService from "@/components/service/Dermatology/DermatologyService";
import SkinTreatmentsService from "@/components/service/SkinTreatment/SkinTreatmentService";
import AestheticTreatmentsService from "@/components/service/AestheticTreatments/AestheticTreatmentsService";
import ServicesCTA from "@/components/service/CTA/ServicesCTA";

export const metadata: Metadata = {
  title: "Services | Sakha Hair Transplant, Dermatology & Beauty Center",
  description:
    "Explore Sakha's approach to hair transplant, dermatology, skin treatments, and aesthetic treatments in Mazar-e-Sharif, with every consultation centered around your individual goals.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServiceCategories />
      <HairTransplantService />
      <DermatologyService />
      <SkinTreatmentsService />
      <AestheticTreatmentsService />
      <ServicesCTA />
    </main>
  );
}