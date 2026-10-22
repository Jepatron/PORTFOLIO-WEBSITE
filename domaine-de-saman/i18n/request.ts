import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// We don't use next-intl's message-catalog system (content/*.ts covers
// translation instead), but next-intl still needs this request config
// wired up for getLocale()/NextIntlClientProvider to resolve the current
// locale outside the [locale] route params (e.g. in the root layout).
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }
  return { locale };
});
