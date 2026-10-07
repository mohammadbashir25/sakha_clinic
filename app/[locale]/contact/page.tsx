import type { Metadata } from "next";

import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ConsultationForm from "@/components/contact/ConsultationForm";
import Location from "@/components/contact/Location";
import ContactCTA from "@/components/contact/ContactCTA";

export const metadata: Metadata = {
  title: "Contact Dr. Ahmad Fahim Sakha",
  description:
    "Contact Dr. Ahmad Fahim Sakha in Mazar-e-Sharif for questions, appointment requests, and consultation inquiries.",
};

export default function ContactPage() {
  return (
    <main className="overflow-hidden">
      <ContactHero />

      <ContactInfo />

      <ConsultationForm />

      <Location />

      <ContactCTA />
    </main>
  );
}