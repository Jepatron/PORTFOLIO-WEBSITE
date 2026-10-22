import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ImmersiveBreak from "@/components/ImmersiveBreak";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import SeasonExplorer from "@/components/SeasonExplorer";
import RegionMap from "@/components/RegionMap";
import { getContent, localizedPath } from "@/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { region, pages } = getContent(locale);
  const title = `${pages.region.title} — ${pages.region.eyebrow}`;
  const description = region.intro;
  return {
    title,
    description,
    alternates: { canonical: localizedPath(locale, "/region") },
    openGraph: { title, description, url: localizedPath(locale, "/region") },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Region({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = getContent(locale);
  const { region, activities, estateLocation, seasonLabels, site, ctaLabel, pages } = content;
  const p = pages.region;

  return (
    <main>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        body={region.intro}
        photoLabel={p.heroPhotoLabel}
        tone="forest"
        primaryCta={{ label: ctaLabel, href: "/availability" }}
        secondaryCta={{ label: pages.weddings.secondaryCtaLabel, href: "/the-estate" }}
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <Reveal>
          <h2 className="font-display text-2xl text-forest">{p.whereLiesHeading}</h2>
          <p className="mt-2 max-w-2xl font-body text-sm text-grey">{p.whereLiesBody}</p>
        </Reveal>
        <div className="mt-6">
          <RegionMap
            activities={activities}
            estateLocation={estateLocation}
            siteName={site.name}
            mapAriaLabel={region.mapAriaLabel}
            mapPopupNote={region.mapPopupNote}
            mapLegendActivities={region.mapLegendActivities}
            openInGoogleMaps={content.ui.openInGoogleMaps}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10">
        <Reveal>
          <h2 className="font-display text-2xl text-forest">{p.nearbyHeading}</h2>
          <p className="mt-2 max-w-2xl font-body text-sm text-grey">{p.nearbyBody}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <SeasonExplorer
            activities={activities}
            seasonLabels={seasonLabels}
            allSeasonsLabel={region.allSeasonsLabel}
            filterAriaLabel={region.filterAriaLabel}
            openInGoogleMaps={content.ui.openInGoogleMaps}
          />
        </Reveal>
      </section>

      <ImmersiveBreak label={p.immersiveLabel} tone="forest" />

      <Reveal className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <h2 className="font-display text-2xl text-forest">{p.gettingHereHeading}</h2>
        <p className="mt-3 font-body text-sm leading-relaxed text-grey">{region.gettingHere}</p>
      </Reveal>

      <CTABanner heading={p.ctaHeading} body={p.ctaBody} ctaLabel={ctaLabel} />
    </main>
  );
}
