import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  FiActivity,
  FiAperture,
  FiDroplet,
  FiEye,
  FiLayers,
  FiScissors,
  FiSun,
  FiTarget,
  FiUser,
  FiZap,
} from "react-icons/fi";
import type { ServiceCategory, ServiceIconId } from "./data";

const ICONS: Record<ServiceIconId, IconType> = {
  scissors: FiScissors,
  droplet: FiDroplet,
  layers: FiLayers,
  user: FiUser,
  eye: FiEye,
  target: FiTarget,
  zap: FiZap,
  sun: FiSun,
  aperture: FiAperture,
  activity: FiActivity,
};

const line = "color-mix(in srgb, var(--color-primary) 13%, transparent)";

const PATTERNS: Partial<Record<ServiceCategory, CSSProperties>> = {
  hair: {
    backgroundImage: `repeating-linear-gradient(90deg, ${line} 0 1px, transparent 1px 26px)`,
  },
  skin: {
    backgroundImage: `radial-gradient(${line} 1.4px, transparent 1.4px)`,
    backgroundSize: "22px 22px",
  },
  laser: {
    backgroundImage: `repeating-linear-gradient(45deg, ${line} 0 1px, transparent 1px 24px)`,
  },
};

interface ServiceVisualProps {
  number: string;
  category: ServiceCategory;
  categoryLabel: string;
  icon: ServiceIconId;
  variant?: "detail" | "compact";
}

/**
 * CSS-only visual identity for a service: oversized number, category
 * pattern, icon and a champagne rule. Decorative, so hidden from assistive tech.
 */
export default function ServiceVisual({
  number,
  category,
  categoryLabel,
  icon,
  variant = "detail",
}: ServiceVisualProps) {
  const Icon = ICONS[icon];
  const isDetail = variant === "detail";

  return (
    <div
      aria-hidden="true"
      className={`relative isolate overflow-hidden border border-charcoal/10 bg-lavender/60 ${
        isDetail ? "aspect-[4/3] sm:aspect-[5/4]" : "aspect-[16/9]"
      }`}
    >
      {category === "aesthetics" ? (
        <>
          <div className="absolute -end-12 -top-12 h-60 w-60 rounded-full border border-primary/15" />
          <div className="absolute -end-4 -top-4 h-44 w-44 rounded-full border border-primary/15" />
          <div className="absolute end-4 top-4 h-28 w-28 rounded-full border border-primary/15" />
        </>
      ) : (
        <div className="absolute inset-0" style={PATTERNS[category]} />
      )}

      <span className="absolute start-5 top-5 text-xs uppercase tracking-[0.18em] text-muted rtl:tracking-normal">
        {categoryLabel}
      </span>

      <span
        className={`absolute end-5 top-5 flex items-center justify-center rounded-full border border-primary/25 bg-ivory text-primary ${
          isDetail ? "h-12 w-12" : "h-9 w-9"
        }`}
      >
        <Icon className={isDetail ? "h-5 w-5" : "h-4 w-4"} />
      </span>

      <span
        className={`absolute bottom-4 start-5 font-light leading-none tabular-nums text-primary/85 ${
          isDetail ? "text-[7rem] sm:text-[9rem]" : "text-6xl"
        }`}
      >
        {number}
      </span>

      <div className="absolute inset-x-5 bottom-0 h-px bg-champagne/70" />
    </div>
  );
}