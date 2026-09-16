import type { Metadata } from "next";
import {Container} from "@/components/ui/Container";
import ContactHero from "@/components/contact/ContactHero/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo/ContactInfo";
import ConsultationForm from "@/components/contact/ConsultationForm/ConsultationForm";
import Location from "@/components/contact/Location/Location";
import ContactCTA from "@/components/contact/ContactCTA/ContactCTA";

export const metadata: Metadata = {
  title: "Contact | Sakha Hair Transplant, Dermatology & Beauty Center",
  description:
    "Contact Sakha in Mazar-e-Sharif to ask questions about hair transplant, dermatology, or aesthetic treatments, or to request a consultation.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />

      <section className="bg-ivory pb-20 lg:pb-28">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
            <ContactInfo />
            <ConsultationForm />
          </div>
        </Container>
      </section>

      <Location />
      <ContactCTA />
    </main>
  );
}