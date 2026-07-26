import type { Metadata } from "next";
import Link from "next/link";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import PageHero from "@/components/PageHero";
import ImmersiveBreak from "@/components/ImmersiveBreak";
import AmenitiesGrid from "@/components/AmenitiesGrid";
import RoomList from "@/components/RoomList";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import { estate } from "@/content/site";

export const metadata: Metadata = {
  title: "The Estate — Domaine de Saman",
  description: "Six bedrooms, five hectares, a private pool, yoga deck, and gym — the full layout of Domaine de Saman.",
};

export default function TheEstate() {
  return (
    <main>
      <PageHero
        eyebrow="The Estate"
        title="Five hectares, six bedrooms, entirely yours."
        photoLabel="Aerial view of the full estate and grounds"
        tone="forest"
        primaryCta={{ label: "Check availability", href: "/availability" }}
        secondaryCta={{ label: "See the gallery", href: "/gallery" }}
      />

      <Reveal className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <p className="font-body text-base leading-relaxed text-grey">{estate.description}</p>
        <Link
          href="/availability"
          className="mt-6 inline-block rounded-sm bg-forest px-6 py-3 font-body text-xs uppercase tracking-[0.2em] text-cream transition-all hover:-translate-y-0.5 hover:bg-forest/90 hover:shadow-lg"
        >
          Enquire about a stay
        </Link>
      </Reveal>

      <section className="mx-auto max-w-4xl px-6 pb-16 md:px-10">
        <Reveal>
          <h2 className="font-display text-2xl text-forest">
            {estate.bedroomCount} bedrooms, sleeps {estate.sleeps}
          </h2>
        </Reveal>
        <div className="mt-6">
          <RoomList />
        </div>
      </section>

      <ImmersiveBreak label="Estate house facade with grounds in the foreground" tone="cream" />

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <Reveal>
          <h2 className="font-display text-2xl text-forest">Amenities</h2>
        </Reveal>
        <div className="mt-6">
          <AmenitiesGrid />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <div className="flex items-baseline justify-between">
          <Reveal>
            <h2 className="font-display text-2xl text-forest">Gallery preview</h2>
          </Reveal>
          <Link
            href="/gallery"
            className="font-body text-xs uppercase tracking-[0.15em] text-brass transition-colors hover:text-brass/70"
          >
            View full gallery →
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

      <CTABanner />
    </main>
  );
}
