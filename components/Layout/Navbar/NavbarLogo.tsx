import Image from "next/image";
import Link from "next/link";
import { brand } from "./data";

/**
 * Renders the Sakha brand mark. Uses a real logo asset once `brand.logoSrc`
 * is set in data.ts; until then it falls back to a restrained text mark so
 * no restructuring is needed later.
 */
export function NavbarLogo() {
  return (
    <Link
      href={brand.href}
      className="flex shrink-0 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
    >
      {brand.logoSrc ? (
        <Image
          src={brand.logoSrc}
          alt={brand.alt}
          width={brand.logoWidth ?? 140}
          height={brand.logoHeight ?? 40}
          priority
          className="h-8 w-auto sm:h-9"
        />
      ) : (
        <span
          className="text-xl font-semibold tracking-[0.08em] text-primary sm:text-2xl"
          aria-label={brand.alt}
        >
          {brand.name}
        </span>
      )}
    </Link>
  );
}
