export interface FinalCtaContentData {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  note: string;
  primaryHref: string;
  secondaryHref: string;
}

/** Non-translatable config. All copy lives in messages under "FinalCTA". */
export const finalCtaLinks = {
  primary: "/consultation",
  secondary: "/services",
} as const;
