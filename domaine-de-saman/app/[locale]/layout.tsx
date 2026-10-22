import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";
import SmoothScroll from "@/components/SmoothScroll";
import { getContent, locales, localizedPath, type Locale } from "@/content";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = getContent(locale);
  const { site } = content;

  return {
    metadataBase: new URL(site.url),
    title: `${site.name} — ${site.metaTagline}`,
    description: content.site.intro,
    alternates: {
      canonical: localizedPath(locale, "/"),
      languages: Object.fromEntries(locales.map((l) => [l, localizedPath(l, "/")])),
    },
    openGraph: {
      title: site.name,
      description: content.site.intro,
      url: localizedPath(locale, "/"),
      siteName: site.name,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: site.name,
      description: content.site.intro,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const content = getContent(locale);
  const { site, estate, estateLocation } = content;

  // Kept deliberately minimal — no address, phone, price, or ratings, since
  // none of those are confirmed facts yet. Structured data should never
  // assert more than the site itself does.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: site.name,
    description: site.intro,
    url: locale === "en" ? site.url : `${site.url}/${locale}`,
    image: locale === "en" ? `${site.url}/opengraph-image` : `${site.url}/${locale}/opengraph-image`,
    inLanguage: locale,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Boulogne-sur-Gesse",
      addressRegion: "Haute-Garonne",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: estateLocation.lat,
      longitude: estateLocation.lng,
    },
    numberOfRooms: estate.bedroomCount,
    maximumAttendeeCapacity: estate.sleeps,
    amenityFeature: estate.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a.title,
    })),
  };

  return (
    <NextIntlClientProvider locale={locale} messages={{}}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="grain" />
      <Nav
        locale={locale as Locale}
        nav={content.nav}
        ctaLabel={content.reserveLabel}
        siteName={site.name}
        languageSwitcherLabel={content.languageSwitcherLabel}
      />
      <SmoothScroll>
        {children}
        <NewsletterSignup contact={content.contact} newsletter={content.newsletter} />
        <Footer site={site} contact={content.contact} footer={content.footer} nav={content.nav} secondaryNav={content.secondaryNav} />
      </SmoothScroll>
    </NextIntlClientProvider>
  );
}
