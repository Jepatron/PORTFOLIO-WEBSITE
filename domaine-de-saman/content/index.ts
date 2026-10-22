import { en } from "./en";
import { fr } from "./fr";
import { de } from "./de";
import type { SiteContent } from "./types";

export const locales = ["en", "fr", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
};

const content: Record<Locale, SiteContent> = { en, fr, de };

export function getContent(locale: string): SiteContent {
  return content[(locale in content ? locale : defaultLocale) as Locale];
}

// Matches i18n/routing.ts's "as-needed" prefix strategy: English stays
// unprefixed, French/German get a real /fr or /de segment. Used to build
// correct canonical URLs in every page's generateMetadata.
export function localizedPath(locale: string, path: string): string {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export type { SiteContent, Season, Activity, Room, NavItem, StayOptionKey } from "./types";
