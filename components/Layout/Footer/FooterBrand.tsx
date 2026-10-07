interface FooterBrandProps {
  name: string;
  fullName: string;
  description: string;
}

export default function FooterBrand({
  name,
  fullName,
  description,
}: FooterBrandProps) {
  return (
    <div className="max-w-sm">
      <p className="text-2xl font-semibold tracking-tight text-[#FAF8F5]">
        {name}
      </p>
      <p className="mt-1 text-sm font-medium text-[#C9A86A]">{fullName}</p>
      <p className="mt-5 text-sm leading-relaxed text-[#F2EAF4]/70">
        {description}
      </p>
    </div>
  );
}
