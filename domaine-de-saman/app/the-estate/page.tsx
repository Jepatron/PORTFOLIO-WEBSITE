import type { Metadata } from "next";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import AmenitiesGrid from "@/components/AmenitiesGrid";
import RoomList from "@/components/RoomList";
import CTABanner from "@/components/CTABanner";
import { estate } from "@/content/site";

export const metadata: Metadata = {
  title: "The Estate — Domaine de Saman",
  description: "Six bedrooms, five hectares, a private pool, yoga deck, and gym — the full layout of Domaine de Saman.",
};

export default function TheEstate() {
  return (
    <main>
      <PhotoPlaceholder
        label="Aerial view of the full estate and grounds"
        tone="forest"
        aspect="aspect-[21/9]"
      />

      <section className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <h1 className="font-display text-3xl text-forest md:text-4xl">The Estate</h1>
        <p className="mt-6 font-body text-base leading-relaxed text-grey">{estate.description}</p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16 md:px-10">
        <h2 className="font-display text-2xl text-forest">
          {estate.bedroomCount} bedrooms, sleeps {estate.sleeps}
        </h2>
        <div className="mt-6">
          <RoomList />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10">
        <h2 className="font-display text-2xl text-forest">Amenities</h2>
        <div className="mt-6">
          <AmenitiesGrid />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <h2 className="font-display text-2xl text-forest">Gallery preview</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {estate.galleryPhotos.slice(0, 6).map((label) => (
            <PhotoPlaceholder key={label} label={label} tone="cream" aspect="aspect-square" />
          ))}
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
