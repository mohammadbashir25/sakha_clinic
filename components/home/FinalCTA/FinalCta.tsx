import { Container } from "@/components/ui/Container";
import { finalCtaData } from "./data";
import FinalCtaContent from "./FinalCtaContent";

/**
 * Final CTA — the last conversion moment on the page.
 *
 * This wrapper stays a Server Component. The cinematic reveal lives in
 * FinalCtaContent (a Client Component), so no motion library code ships
 * unless it's actually needed on this section.
 */
export default function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative isolate overflow-hidden bg-[#320154] px-6 py-24 sm:py-28 lg:py-32"
    >
      {/* Restrained ambient glow — a single soft champagne light, not a gradient wash.
          Static by default; only breathes if the user allows motion. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-[#C9A86A] opacity-[0.08] blur-[140px] motion-safe:animate-[sakha-glow_9s_ease-in-out_infinite]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#210038] opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <Container className="relative">
        <FinalCtaContent data={finalCtaData} />
      </Container>

      <style>
        {`
          @keyframes sakha-glow {
            0%, 100% { opacity: 0.06; transform: scale(1); }
            50% { opacity: 0.12; transform: scale(1.06); }
          }
        `}
      </style>
    </section>
  );
}
