"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { locales, type Locale } from "@/content";

const shortLabels: Record<Locale, string> = { en: "EN", fr: "FR", de: "DE" };

export default function LanguageSwitcher({
  currentLocale,
  solid,
  label,
}: {
  currentLocale: Locale;
  solid: boolean;
  label: string;
}) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label={label}>
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1.5">
          {i > 0 && <span className={solid ? "text-charcoal/30" : "text-cream/40"}>·</span>}
          <Link
            href={pathname}
            locale={locale}
            aria-current={locale === currentLocale ? "true" : undefined}
            className={`font-body text-[11px] uppercase tracking-[0.1em] transition-colors ${
              locale === currentLocale
                ? solid
                  ? "text-forest"
                  : "text-cream"
                : solid
                  ? "text-charcoal/40 hover:text-forest"
                  : "text-cream/50 hover:text-cream"
            }`}
          >
            {shortLabels[locale]}
          </Link>
        </span>
      ))}
    </div>
  );
}
