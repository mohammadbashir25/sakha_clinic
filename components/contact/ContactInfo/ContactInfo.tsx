import ContactInfoContent from "./ContactInfoContent";
import { contactInfoData } from "./data";

/**
 * Renders only the left column's content (heading, description, contact
 * details). The surrounding two-column grid and section chrome live in
 * app/contact/page.tsx, since this column is always paired with
 * ConsultationForm as one split layout, per the brief.
 */
export default function ContactInfo() {
  return <ContactInfoContent data={contactInfoData} />;
}