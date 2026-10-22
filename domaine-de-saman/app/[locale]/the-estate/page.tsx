import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import PageHero from "@/components/PageHero";
import VideoBlock from "@/components/VideoBlock";
import AmenitiesGrid from "@/components/AmenitiesGrid";
import RoomList from "@/components/RoomList";
import HouseCards from "@/components/HouseCards";
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
  const title = `${pages.estate.title} — ${pages.estate.eyebrow}`;
  const description = estate.description;
  return {
    title,
    description,
    alternates: { canonical: localizedPath(locale, "/the-estate") },
    openGraph: { title, description, url: localizedPath(locale, "/the-estate") },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function TheEstate({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = getContent(locale);
  const { estate, ctaLabel, ui, pages } = content;
  const p = pages.estate;

  return (
    <main>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        photoLabel={p.heroPhotoLabel}
        tone="forest"
        primaryCta={{ label: ctaLabel, href: "/availability" }}
        secondaryCta={{ label: p.secondaryCtaLabel, href: "/gallery" }}
      />

      <Reveal className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <p className="font-body text-base leading-relaxed text-grey">{estate.description}</p>
        <Link
          href="/availability"
          className="mt-6 inline-block rounded-sm bg-forest px-6 py-3 font-body text-xs uppercase tracking-[0.2em] text-cream transition-all hover:-translate-y-0.5 hover:bg-forest/90 hover:shadow-lg"
        >
          {p.enquireCta}
        </Link>
      </Reveal>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10">
        <Reveal>
          <h2 className="font-display text-2xl text-forest">{p.twoHousesHeading}</h2>
        </Reveal>
        <div className="mt-6">
          <HouseCards estate={estate} sleepsAndBedrooms={ui.sleepsAndBedrooms} exploreCta={ui.exploreHouseCta} />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16 md:px-10">
        <Reveal>
          <h2 className="font-display text-2xl text-forest">
            {p.villaHeading
              .replace("{name}", estate.villa.name)
              .replace("{bedrooms}", String(estate.villa.bedroomCount))
              .replace("{sleeps}", String(estate.villa.sleeps))}
          </h2>
        </Reveal>
        <div className="mt-6">
          <RoomList rooms={estate.villa.rooms} labels={ui.roomTable} />
        </div>
      </section>

      <VideoBlock
        src="/media/mainhouse-outside.mp4"
        poster="/media/mainhouse-outside-poster.jpg"
        aspect="aspect-[21/9]"
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <Reveal>
          <h2 className="font-display text-2xl text-forest">{p.amenitiesHeading}</h2>
        </Reveal>
        <div className="mt-6">
          <AmenitiesGrid amenities={estate.amenities} />
        </div>
      </section>

      <section className="bg-brass">
        <PhotoPlaceholder label={estate.poolFeature.photoLabel} tone="brass" aspect="aspect-[16/9]" animated />
        <Reveal className="mx-auto max-w-2xl px-6 py-16 text-center md:px-10 md:py-24">
          <p className="font-display text-xl leading-relaxed text-cream md:text-2xl">{estate.poolFeature.body}</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <Reveal>
          <h2 className="font-display text-2xl text-forest">{p.insideVillaHeading}</h2>
        </Reveal>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="overflow-hidden border border-charcoal/10">
            <VideoBlock
              src="/media/mainhouse-livingroom.mp4"
              poster="/media/mainhouse-livingroom-poster.jpg"
              aspect="aspect-[4/3]"
            />
            <p className="p-4 font-body text-xs uppercase tracking-[0.15em] text-charcoal/60">
              {p.livingRoomLabel}
            </p>
          </div>
          <div className="overflow-hidden border border-charcoal/10">
            <VideoBlock
              src="/media/mainhouse-room.mp4"
              poster="/media/mainhouse-room-poster.jpg"
              aspect="aspect-[4/3]"
            />
            <p className="p-4 font-body text-xs uppercase tracking-[0.15em] text-charcoal/60">
              {p.insideVillaHeading}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <div className="flex items-baseline justify-between">
          <Reveal>
            <h2 className="font-display text-2xl text-forest">{p.galleryPreviewHeading}</h2>
          </Reveal>
          <Link
            href="/gallery"
            className="font-body text-xs uppercase tracking-[0.15em] text-brass transition-colors hover:text-brass/70"
          >
            {ui.viewFullGalleryCta}
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {estate.galleryPhotos.slice(0, 6).map((label, i) => (
            <Reveal key={label} delay={(i % 3) * 0.08} className="group overflow-hidden">
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

      <CTABanner heading={ui.defaultCtaHeading} body={ui.defaultCtaBody} ctaLabel={ctaLabel} />
    </main>
  );
}
