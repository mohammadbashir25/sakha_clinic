import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

interface BlogFormHeaderProps {
  title: string;
  description: string;
}

export function BlogFormHeader({ title, description }: BlogFormHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <Link
        href="/admin/blogs"
        className="inline-flex w-fit items-center gap-1.5 rounded text-sm font-medium text-muted transition-colors duration-200 hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid"
      >
        <LuArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to blogs
      </Link>

      <div>
        <h2 className="text-2xl font-semibold leading-tight text-charcoal sm:text-3xl">{title}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </div>
  );
}