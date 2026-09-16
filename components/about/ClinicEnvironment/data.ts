export interface ClinicEnvironmentData {
  eyebrow: string;
  heading: string;
  description: string;
  image: { label: string; alt: string };
}

export const clinicEnvironmentData: ClinicEnvironmentData = {
  eyebrow: "The Clinic",
  heading: "A setting designed to feel calm.",
  description:
    "Sakha's clinic in Mazar-e-Sharif is designed to feel unhurried — a space where consultations happen without pressure and treatments take place in a comfortable, professional environment.",
  image: {
    label: "Sakha clinic environment — [CLIENT INPUT REQUIRED: real photography]",
    alt: "Interior of Sakha Hair Transplant, Dermatology & Beauty Center",
  },
};