import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import PageHero from "@/components/PageHero";
import ImmersiveBreak from "@/components/ImmersiveBreak";
import RoomList from "@/components/RoomList";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import { getContent, localizedPath } from "@/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { estate, pages } = getContent(locale);
  const title = `${pages.farmhouse.title} — ${pages.farmhouse.eyebrow}`;
  const description = estate.farmhouse.description;
  return {
    title,
    description,
    alternates: { canonical: localizedPath(locale, "/the-farmhouse") },
    openGraph: { title, description, url: localizedPath(locale, "/the-farmhouse") },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function TheFarmhouse({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = getContent(locale);
  const { estate, ctaLabel, ui, pages } = content;
  const { farmhouse } = estate;
  const p = pages.farmhouse;

  return (
    <main>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        photoLabel={farmhouse.photoLabel}
        tone="brass"
        primaryCta={{ label: ctaLabel, href: "/availability" }}
        secondaryCta={{ label: p.secondaryCtaLabel, href: "/the-estate" }}
      />

      <Reveal className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <p className="font-body text-base leading-relaxed text-grey">{farmhouse.description}</p>
        <p className="mt-4 font-body text-sm leading-relaxed text-grey">
          {p.datingBackBody.replace("{built}", farmhouse.built)}
        </p>
        <Link
          href="/availability"
          className="mt-6 inline-block rounded-sm bg-forest px-6 py-3 font-body text-xs uppercase tracking-[0.2em] text-cream transition-all hover:-translate-y-0.5 hover:bg-forest/90 hover:shadow-lg"
        >
          {pages.estate.enquireCta}
        </Link>
      </Reveal>

      <section className="mx-auto max-w-4xl px-6 pb-16 md:px-10">
        <Reveal>
          <h2 className="font-display text-2xl text-forest">
            {p.roomsHeading.replace("{bedrooms}", String(farmhouse.bedroomCount)).replace("{sleeps}", String(farmhouse.sleeps))}
          </h2>
        </Reveal>
        <div className="mt-6">
          <RoomList rooms={farmhouse.rooms} labels={ui.roomTable} />
        </div>
      </section>

      <ImmersiveBreak label={p.immersiveLabel} tone="brass" />

      <section className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <Reveal>
          <div className="border border-brass/30 bg-cream-deep p-8">
            <h2 className="font-display text-xl text-forest">{p.bookingHeading}</h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-grey">{farmhouse.rentalNote}</p>
            <Link
              href="/the-estate"
              className="mt-5 inline-block font-body text-xs uppercase tracking-[0.15em] text-brass transition-colors hover:text-brass/70"
            >
              {p.seeEstateLink}
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <Reveal>
          <h2 className="font-display text-2xl text-forest">{p.galleryPreviewHeading}</h2>
        </Reveal>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {farmhouse.galleryPhotos.map((label, i) => (
            <Reveal key={label} delay={(i % 4) * 0.08} className="group overflow-hidden">
              <PhotoPlaceholder
                label={label}
                tone="cream"
                aspect="aspect-square"
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </Reveal>
          ))}
        </div>
      </section>

      <CTABanner heading={p.ctaHeading} body={p.ctaBody} ctaLabel={ctaLabel} />
    </main>
  );
}
