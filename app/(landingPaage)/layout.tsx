import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Footer from "@/components/Layout/Footer/Footer";
import { Navbar } from "@/components/Layout/Navbar/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sakha Hair Transplant, Dermatology & Beauty Center",
    template: "%s | Sakha",
  },

  description:
    "Sakha Hair Transplant, Dermatology & Beauty Center in Mazar-e-Sharif, Afghanistan. Professional hair transplant, dermatology, skin care, and aesthetic treatments.",

  keywords: [
    "Sakha Hair Transplant",
    "hair transplant Mazar-e-Sharif",
    "dermatology Mazar-e-Sharif",
    "hair transplant Afghanistan",
    "skin care",
    "hair loss treatment",
    "beard transplant",
    "eyebrow transplant",
    "PRP",
    "mesotherapy",
    "Botox",
    "fillers",
    "Hydrafacial",
    "microneedling",
  ],

  authors: [
    {
      name: "Sakha Hair Transplant, Dermatology & Beauty Center",
    },
  ],

  creator: "Sakha Hair Transplant, Dermatology & Beauty Center",

  openGraph: {
    title: "Sakha Hair Transplant, Dermatology & Beauty Center",
    description:
      "Professional hair, skin, and aesthetic treatments in Mazar-e-Sharif, Afghanistan.",
    locale: "en_US",
    type: "website",
    siteName: "Sakha",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sakha Hair Transplant, Dermatology & Beauty Center",
    description:
      "Professional hair, skin, and aesthetic treatments in Mazar-e-Sharif, Afghanistan.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <header>
          <Navbar />
        </header>
        {children}
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}