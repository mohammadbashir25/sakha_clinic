export interface SelectOption {
  value: string;
  label: string;
}

export interface ConsultationFormData {
  heading: string;
  disclaimer: string;
  submitLabel: string;
  submittingLabel: string;
  successMessage: string;
  errorMessage: string;
  serviceOptions: SelectOption[];
  contactMethodOptions: SelectOption[];
}

export const consultationFormData: ConsultationFormData = {
  heading: "Request a Consultation",
  disclaimer:
    "This form is a request for a consultation, not a medical diagnosis. A member of the Sakha team will contact you to discuss next steps.",
  submitLabel: "Request a Consultation",
  submittingLabel: "Sending…",
  successMessage:
    "Thank you — your consultation request has been received. Sakha will contact you shortly.",
  errorMessage:
    "Something went wrong sending your request. Please try again, or reach Sakha directly by phone or WhatsApp.",
  serviceOptions: [
    { value: "hair-transplant", label: "Hair Transplant" },
    { value: "dermatology", label: "Dermatology" },
    { value: "skin-treatments", label: "Skin Treatments" },
    { value: "aesthetic-treatments", label: "Aesthetic Treatments" },
    { value: "not-sure", label: "Not sure yet" },
  ],
  contactMethodOptions: [
    { value: "phone", label: "Phone Call" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "either", label: "Either" },
  ],
};