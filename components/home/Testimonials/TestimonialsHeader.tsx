interface TestimonialsHeaderProps {
  eyebrow: string;
  heading: string;
  description: string;
}

export default function TestimonialsHeader({
  eyebrow,
  heading,
  description,
}: TestimonialsHeaderProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="flex items-center justify-center gap-4">
        <span className="h-px w-8 bg-[#320154]/30" />
        <span className="text-xs font-medium tracking-[0.3em] text-[#9A3FA5]">
          {eyebrow.toUpperCase()}
        </span>
        <span className="h-px w-8 bg-[#320154]/30" />
      </div>

      <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight text-[#320154] sm:text-4xl">
        {heading}
      </h2>

      <p className="mt-5 text-base leading-relaxed text-[#716B75]">
        {description}
      </p>
    </div>
  );
}
