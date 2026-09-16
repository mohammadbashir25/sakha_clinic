import Image from "next/image";
import { Caveat } from "next/font/google";
import type { WhyChooseSakhaData } from "./data";

// Cursive accent font for the small "Your journey. Our priority." line.
// Scoped to this file only — the rest of the section stays on the
// brand's Inter / Instrument Serif pairing.
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
});

interface WhyChooseSakhaVisualProps {
  image?: WhyChooseSakhaData["image"];
  tagline?: string;
}

/**
 * Purely decorative background layer: soft orchid blob (top-left),
 * a thin arc line (bottom-left), a blurred ambient photo bleeding
 * off the right edge, and a small cursive tagline. All aria-hidden —
 * none of this carries information, so it never competes with the
 * real heading/content for a screen reader.
 */
export default function WhyChooseSakhaVisual({
  tagline,
}: WhyChooseSakhaVisualProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >





      {/* Script tagline, bottom-right */}
      {tagline && (
        <p
          className={`${caveat.className} absolute bottom-10 right-8 hidden -rotate-3 text-2xl leading-tight text-[#320154]/30 sm:block`}
        >
          {tagline.split(". ").map((line, i, arr) => (
            <span key={line} className="block">
              {line}
              {i < arr.length - 1 ? "." : ""}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}