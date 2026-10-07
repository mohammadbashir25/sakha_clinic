import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { footerNav, footerAppointmentHref, footerContactHref } from "./data";
import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import { LanguageSwitcher } from "../Navbar/LanguageSwitcher";

/**
 * Footer — the quiet final element of the site.
 *
 * Server Component. Copy is resolved via next-intl and passed down as
 * plain strings. The only client code is the language switcher.
 */
export default async function Footer() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#210038] px-6 pb-8 pt-16 text-[#FAF8F5] sm:pt-20">
      <Container>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <FooterBrand
              name={t("brandName")}
              fullName={t("brandFullName")}
              description={t("description")}
            />
          </div>

          <FooterLinks
            navigationTitle={t("navigationTitle")}
            navItems={footerNav.map((item) => ({
              href: item.href,
              label: t(item.key),
            }))}
            contactTitle={t("contactTitle")}
            locationLabel={t("locationLabel")}
            location={t("location")}
            getInTouchLabel={t("getInTouch")}
            getInTouchHref={footerContactHref}
            appointmentTitle={t("appointmentTitle")}
            appointmentLabel={t("bookAppointment")}
            appointmentHref={footerAppointmentHref}
          />
        </div>

        <div className="mt-14 border-t border-[#F2EAF4]/10 pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="text-sm text-[#F2EAF4]/70">
                {t("copyright", { year })}
              </p>
              <p className="text-xs leading-relaxed text-[#F2EAF4]/55 sm:text-[13px]">
                {t("disclaimer")}
              </p>
            </div>

            <LanguageSwitcher />
          </div>
        </div>
      </Container>
    </footer>
  );
}
