import {Container} from "@/components/ui/Container";
import { blogHeroData } from "./data";

export default function BlogHero() {
  return (
    <section className="bg-ivory pt-20 pb-14 lg:pt-20 lg:pb-16">
      <Container>
        <div className="max-w-2xl border-b border-muted/20 pb-14 lg:pb-16">
          <span className="text-sm font-medium uppercase tracking-[0.18em] text-champagne">
            {blogHeroData.eyebrow}
          </span>
          <h1 className="mt-4 text-4xl leading-tight text-charcoal sm:text-5xl lg:text-6xl">
            {blogHeroData.heading}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {blogHeroData.description}
          </p>
        </div>
      </Container>
    </section>
  );
}