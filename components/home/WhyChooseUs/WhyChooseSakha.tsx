import { whyChooseSakhaData } from "./data";
import WhyChooseSakhaContent from "./WhyChooseSakhaContent";
import WhyChooseSakhaVisual from "./WhyChooseSakhaVisual";

/**
 * Why Choose Sakha
 *
 * Centered editorial trust section: eyebrow, heading, description,
 * a 3-then-2 grid of numbered trust points, and a CTA — with a quiet
 * decorative backdrop (blob, arc line, blurred ambient photo, script
 * tagline). All copy lives in data.ts — see the notes there before
 * editing any placeholder or claim-adjacent content.
 *
 * This component is a Server Component; the scroll-reveal animation
 * is isolated to WhyChooseSakhaContent. WhyChooseSakhaVisual is a
 * static, purely decorative backdrop and stays server-rendered too.
 */
export default function WhyChooseSakha() {
  const data = whyChooseSakhaData;

  return (
    <section
      aria-label={data.heading}
      className="relative overflow-hidden bg-[#FAF8F5] py-24 sm:py-28"
    >
      <WhyChooseSakhaVisual image={data.image} tagline={data.tagline} />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <WhyChooseSakhaContent data={data} />
      </div>
    </section>
  );
}