export interface SakhaStoryData {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  note: string;
  image: { label: string; alt: string };
}

export const sakhaStoryData: SakhaStoryData = {
  eyebrow: "Our Story",
  heading: "Why Sakha exists.",
  paragraphs: [
    "[CLIENT INPUT REQUIRED: the story of how Sakha started, what motivated its founding, and what it set out to offer patients in Mazar-e-Sharif.]",
  ],
  note: "This section will be completed once the clinic's founding story is confirmed.",
  image: {
    label: "Sakha clinic story image — [CLIENT INPUT REQUIRED: real photography]",
    alt: "A view inside Sakha Hair Transplant, Dermatology & Beauty Center",
  },
};