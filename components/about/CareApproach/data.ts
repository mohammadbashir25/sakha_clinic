export interface ApproachPrinciple {
  title: string;
  description: string;
}

export interface CareApproachData {
  eyebrow: string;
  heading: string;
  principles: ApproachPrinciple[];
}

export const careApproachData: CareApproachData = {
  eyebrow: "Our Approach",
  heading: "How we approach every consultation.",
  principles: [
    {
      title: "Personalized Care",
      description:
        "Every recommendation is shaped by an individual assessment, not a standard package.",
    },
    {
      title: "Clear Communication",
      description:
        "What a treatment involves, and what to expect, is explained clearly before you decide.",
    },
    {
      title: "Thoughtful Treatment Planning",
      description:
        "Plans are considered carefully, with attention to your goals and circumstances.",
    },
    {
      title: "Patient Comfort",
      description:
        "The consultation and treatment experience is designed to feel unhurried and personal.",
    },
  ],
};