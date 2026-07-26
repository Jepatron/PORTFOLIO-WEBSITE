import type { Metadata } from "next";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import { estate } from "@/content/site";

export const metadata: Metadata = {
  title: "Gallery — Domaine de Saman",
  description: "Photo gallery of Domaine de Saman — house, pool, yoga deck, gym, and grounds.",
};

export default function Gallery() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 py-16 text-center md:px-10">
        <h1 className="font-display text-3xl text-forest md:text-4xl">Gallery</h1>
        <p className="mt-4 font-body text-sm text-grey">
          Real photography is coming soon — each block below is a placeholder for where a photo will go.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {estate.galleryPhotos.map((label, i) => (
            <PhotoPlaceholder
              key={label}
              label={label}
              tone={i % 3 === 0 ? "forest" : i % 3 === 1 ? "cream" : "brass"}
              aspect="aspect-square"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
