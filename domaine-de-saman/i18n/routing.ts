import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "@/content";

export const routing = defineRouting({
  locales,
  defaultLocale,
  // English stays unprefixed at "/" (no broken links to the existing site);
  // French and German get real, separately-indexable "/fr" and "/de" URLs.
  localePrefix: "as-needed",
});
