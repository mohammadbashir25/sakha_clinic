import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import { Link } from "@/i18n/navigation";

interface FooterLinksProps {
  navigationTitle: string;
  navItems: { href: string; label: string }[];
  contactTitle: string;
  locationLabel: string;
  location: string;
  getInTouchLabel: string;
  getInTouchHref: string;
  appointmentTitle: string;
  appointmentLabel: string;
  appointmentHref: string;
}

const linkClass =
  "inline-block py-1 text-sm text-[#F2EAF4]/70 transition-colors duration-200 hover:text-[#C96BD5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C96BD5]";

export default function FooterLinks({
  navigationTitle,
  navItems,
  contactTitle,
  locationLabel,
  location,
  getInTouchLabel,
  getInTouchHref,
  appointmentTitle,
  appointmentLabel,
  appointmentHref,
}: FooterLinksProps) {
  return (
    <>
      <nav aria-labelledby="footer-explore-heading">
        <h3
          id="footer-explore-heading"
          className="text-sm font-medium text-[#FAF8F5]"
        >
          {navigationTitle}
        </h3>
        <ul className="mt-4 space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={linkClass}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <h3 className="text-sm font-medium text-[#FAF8F5]">{contactTitle}</h3>
        <div className="mt-4 flex items-start gap-3">
          <FiMapPin
            className="mt-1 h-4 w-4 shrink-0 text-[#C9A86A]"
            aria-hidden="true"
          />
          <div>
            <p className="text-xs text-[#F2EAF4]/55">{locationLabel}</p>
            <p className="mt-0.5 text-sm text-[#F2EAF4]/80">{location}</p>
          </div>
        </div>
        <Link href={getInTouchHref} className={`${linkClass} mt-3`}>
          {getInTouchLabel}
        </Link>
      </div>

      <div>
        <h3 className="text-sm font-medium text-[#FAF8F5]">
          {appointmentTitle}
        </h3>
        <Link
          href={appointmentHref}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#FAF8F5] px-6 py-3 text-sm font-medium text-[#320154] transition-colors duration-200 hover:bg-[#C9A86A] hover:text-[#210038] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A86A]"
        >
          {appointmentLabel}
          <FiArrowUpRight
            className="h-4 w-4 rtl:-scale-x-100"
            aria-hidden="true"
          />
        </Link>
      </div>
    </>
  );
}
