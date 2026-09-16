import { Container } from "@/components/ui/Container";
import { SectionHeading  } from "@/components/ui/SectionHeading";
import ServiceCategoryCard from "./ServiceCategoryCard";
import { serviceCategoriesData } from "./data";

export default function ServiceCategories() {
  return (
    <section id="categories" className="bg-lavender/40 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="What We Offer"
          title="Four areas of focused care."
          description="Each category is built around a consultation-first approach, so treatment is shaped by your assessment rather than a fixed package."
        />
        <div className="mt-14 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategoriesData.map((category, index) => (
            <div key={category.id} className="bg-lavender/40">
              <ServiceCategoryCard category={category} index={index} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}