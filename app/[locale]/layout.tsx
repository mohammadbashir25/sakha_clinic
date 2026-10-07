import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import "../globals.css";

import Footer from "@/components/Layout/Footer/Footer";
import { Navbar } from "@/components/Layout/Navbar/Navbar";
import {
  defaultLocale,
  getDirection,
  isValidLocale,
  type Locale,
} from "@/i18n/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Production:
 * Add this to .env.local / Vercel:
 *
 * NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
 *
 * Do not leave the localhost value in production.
 */
const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
);

const siteName = "Sakha Hair Transplant, Dermatology & Beauty Center";

const localeMetadata: Record<
  Locale,
  {
    title: string;
    description: string;
    keywords: string[];
    ogLocale: string;
  }
> = {
  en: {
    title: "Sakha Hair Transplant, Dermatology & Beauty Center",
    description:
      "Sakha Hair Transplant, Dermatology & Beauty Center in Mazar-e-Sharif, Afghanistan, offering hair transplant, dermatology, skin care, and aesthetic treatments.",
    keywords: [
      "Sakha Hair Transplant",
      "hair transplant Mazar-e-Sharif",
      "hair transplant Afghanistan",
      "dermatology Mazar-e-Sharif",
      "dermatology Afghanistan",
      "hair loss treatment",
      "beard transplant",
      "eyebrow transplant",
      "skin care",
      "acne treatment",
      "PRP",
      "mesotherapy",
      "Botox",
      "fillers",
      "Hydrafacial",
      "microneedling",
    ],
    ogLocale: "en_US",
  },

  fa: {
    title: "مرکز کاشت مو، پوست و زیبایی سَخا",
    description:
      "مرکز کاشت مو، پوست و زیبایی سَخا در مزار شریف، افغانستان؛ ارائه‌دهنده خدمات کاشت مو، مراقبت پوست، درمان‌های پوستی و خدمات زیبایی.",
    keywords: [
      "مرکز سَخا",
      "کاشت مو در مزار شریف",
      "کاشت مو افغانستان",
      "متخصص پوست مزار شریف",
      "درمان ریزش مو",
      "کاشت ریش",
      "کاشت ابرو",
      "مراقبت پوست",
      "درمان آکنه",
      "PRP",
      "مزوتراپی",
      "بوتاکس",
      "فیلر",
      "هیدرافیشیال",
      "میکرونیدلینگ",
    ],
    ogLocale: "fa_AF",
  },

  ps: {
    title: "سخا د وېښتانو کښت، پوستکي او ښکلا مرکز",
    description:
      "سخا د وېښتانو کښت، پوستکي او ښکلا مرکز په مزار شریف، افغانستان کې؛ د وېښتانو کښت، د پوستکي پاملرنې، د پوستکي درملنې او ښکلايي خدمات وړاندې کوي.",
    keywords: [
      "سخا مرکز",
      "په مزار شریف کې د وېښتانو کښت",
      "افغانستان کې د وېښتانو کښت",
      "د پوستکي درملنه مزار شریف",
      "د وېښتانو تویېدو درملنه",
      "د ږیرې کښت",
      "د ابرو کښت",
      "د پوستکي پاملرنه",
      "د جوانیو درملنه",
      "PRP",
      "مزوتراپي",
      "بوټوکس",
      "فیلر",
      "هایډرافیشل",
      "میکرونیدلینګ",
    ],
    ogLocale: "ps_AF",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam;
  const content = localeMetadata[locale];


  const localePath = locale === defaultLocale ? "/en" : `/${locale}`;

  const canonicalUrl = new URL(localePath, siteUrl);

  /**
   * Language alternate URLs.
   *
   * /en = English
   * /fa = Dari
   * /ps = Pashto
   */
  const languageAlternates = {
    en: new URL("/en", siteUrl).toString(),
    fa: new URL("/fa", siteUrl).toString(),
    ps: new URL("/ps", siteUrl).toString(),
    "x-default": new URL("/en", siteUrl).toString(),
  };

  return {
    metadataBase: siteUrl,

    title: {
      default: content.title,
      template: `%s | Sakha`,
    },

    description: content.description,

    keywords: content.keywords,

    applicationName: "Sakha",

    authors: [
      {
        name: siteName,
      },
    ],

    creator: siteName,
    publisher: siteName,

    category: "healthcare",

    alternates: {
      canonical: canonicalUrl.toString(),
      languages: languageAlternates,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      type: "website",
      siteName: "Sakha",
      title: content.title,
      description: content.description,
      url: canonicalUrl.toString(),
      locale: content.ogLocale,

      images: [
        {
          url: "/images/sakha-og-image.png",
          width: 1200,
          height: 630,
          alt: content.title,
          type: "image/png",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,

      images: [
        {
          url: "/images/sakha-og-image.png",
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
    },

    icons: {
      icon: "/favicon.ico",
    },

    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },

    other: {
      "geo.region": "AF-BAL",
      "geo.placename": "Mazar-e-Sharif",
      "geo.country": "Afghanistan",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam;
  const direction = getDirection(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={direction}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <header>
            <Navbar />
          </header>

          {children}

          <footer>
            <Footer />
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
